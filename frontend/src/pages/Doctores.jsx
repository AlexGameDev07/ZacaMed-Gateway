import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctores.css'; // Archivo CSS para estilos

function Doctores() {
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/doctores', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviar el token
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al obtener los doctores');
                }

                const data = await response.json();
                setDoctores(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctores();
    }, []);

    if (loading) return <p className="loading">Cargando doctores...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="doctores-page">
            <h1 className="header-title">Lista de Doctores</h1>
            <ul className="doctores-list">
                {doctores.map((doctor) => (
                    <li key={doctor._id} className="doctor-item">
                        <div className="doctor-info">
                            <strong>{doctor.nombre}</strong> - {doctor.especialidad}
                        </div>
                        <button
                            className="change-password-button"
                            onClick={() => navigate('/password-recovery')}
                        >
                            Cambiar Contraseña
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Doctores;