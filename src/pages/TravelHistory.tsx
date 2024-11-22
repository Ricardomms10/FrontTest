import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TravelHistory: React.FC = () => {
    const [rides, setRides] = useState<any[]>([]);
    const [filters, setFilters] = useState({ userId: '', driverId: '' });

    // Usando useCallback para memorizar a função handleSubmitFilter
    const handleSubmitFilter = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/ride/${filters.userId}`, {
                params: { driver_id: filters.driverId }
            });
            setRides(response.data.rides);
        } catch (error) {
            alert('Erro ao carregar histórico de viagens.');
        }
    }, [filters.userId, filters.driverId]); // Dependências da função

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Atualizando useEffect para incluir as dependências corretas
    useEffect(() => {
        if (filters.userId) {
            handleSubmitFilter({} as React.FormEvent); // Chamando a função diretamente
        }
    }, [filters.userId, handleSubmitFilter]); // Adicionando handleSubmitFilter como dependência

    return (
        <div>
            <h1>Histórico de Viagens</h1>
            <form onSubmit={handleSubmitFilter}>
                <input
                    type="text"
                    name="userId"
                    placeholder="ID do usuário"
                    value={filters.userId}
                    onChange={handleFilterChange}
                />
                <select
                    name="driverId"
                    value={filters.driverId}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos os motoristas</option>
                    {/* Adicione as opções de motoristas aqui */}
                </select>
                <button type="submit">Aplicar Filtro</button>
            </form>
            <ul>
                {rides.map((ride) => (
                    <li key={ride.id}>
                        <p>{ride.date}</p>
                        <p>{ride.driver.name}</p>
                        <p>{ride.origin} - {ride.destination}</p>
                        <p>Distância: {ride.distance} km</p>
                        <p>Tempo: {ride.duration} min</p>
                        <p>Valor: R${ride.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelHistory;
