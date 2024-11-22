import React, { useState } from 'react';
import axios from 'axios';
import style from './FormRequest.module.scss'

interface FormData {
    userId: string;
    origin: string;
    destination: string;
}

const FormRequest: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        userId: '',
        origin: '',
        destination: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedData = { ...formData, [e.target.name]: e.target.value };
        setFormData(updatedData);
        console.log('Dados atualizados:', updatedData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.userId || !formData.origin || !formData.destination) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        console.log('Dados enviados:', formData);
        try {
            const response = await axios.post('http://localhost:8080/ride/estimate', formData);
            console.log('Resposta do servidor:', response);

            // Invocar a função passada via props com os dados da resposta
            onSubmit(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro do servidor:', error.response?.data || 'Erro desconhecido no servidor');
                setError(error.response?.data?.message || 'Erro ao estimar a viagem.');
            } else {
                console.error('Erro inesperado:', error);
                setError('Erro inesperado. Tente novamente.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.container}>
            <input
                type="text"
                name="userId"
                placeholder="ID do usuário"
                value={formData.userId}
                onChange={handleChange}
            />
            <input
                type="text"
                name="origin"
                placeholder="Endereço de origem"
                value={formData.origin}
                onChange={handleChange}
            />
            <input
                type="text"
                name="destination"
                placeholder="Endereço de destino"
                value={formData.destination}
                onChange={handleChange}
            />
            <button type="submit">Estimativa</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default FormRequest;
