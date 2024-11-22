import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import style from './TravelOptions.module.scss'

const TravelOptions: React.FC = () => {
    const location = useLocation();
    const { tripData } = location.state;

    const handleChooseDriver = async (driverId: number) => {
        try {
            await axios.post('http://localhost:3000/api/ride/confirm', {
                customer_id: tripData.userId,
                driver_id: driverId,
            });
            alert('Viagem confirmada!');
            window.location.href = '/travel-history';
        } catch (error) {
            alert('Erro ao confirmar a viagem.');
        }
    };

    return (
        <div className={style.container}>
            <h1>Opções de Viagem</h1>
            <div className={style.boxText}>
                <p>Rota de {tripData.origin} para {tripData.destination}</p>
                <div>
                    {tripData.drivers.map((driver: any) => (
                        <div key={driver.id}>
                            <p>{driver.name}</p>
                            <p>{driver.description}</p>
                            <p>{driver.car}</p>
                            <p>Avaliação: {driver.rating}</p>
                            <p>Valor: R${driver.value}</p>
                            <button onClick={() => handleChooseDriver(driver.id)}>Escolher</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelOptions;
