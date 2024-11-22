import React, { useState } from 'react';
import FormRequest from '../../components/FormRequest/FormRequest';
import { useNavigate } from 'react-router-dom';
import style from './RequestRide.module.scss'

const RequestRide: React.FC = () => {
    const [tripData, setTripData] = useState<any | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        setTripData(data);
        navigate('/ride-options', { state: { tripData: data } });
    };

    return (
        <div className={style.container}>
            <h1>Solicitação de Viagem</h1>
            <FormRequest onSubmit={handleSubmit} />

            {tripData && (
                <div>
                    <h3>Resumo da Solicitação de Viagem:</h3>
                    <p><strong>Origem:</strong> {tripData.origin}</p>
                    <p><strong>Destino:</strong> {tripData.destination}</p>
                </div>
            )}
        </div>
    );
};

export default RequestRide;
