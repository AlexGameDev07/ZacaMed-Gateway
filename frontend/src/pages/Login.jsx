import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Archivo CSS para los estilos

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({ email: '', password: '', general: '' }); // Limpiar errores previos

        if (!email) {
            setError((prev) => ({ ...prev, email: 'El correo electrónico es obligatorio' }));
            return;
        }

        if (!password) {
            setError((prev) => ({ ...prev, password: 'La contraseña es obligatoria' }));
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Guardar el token en localStorage
            navigate('/doctores'); // Redirige a la página de doctores
        } catch (error) {
            setError((prev) => ({ ...prev, general: error.message }));
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Bienvenido a ZacaMed</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`login-input ${error.email ? 'input-error' : ''}`}
                        />
                        {error.email && <p className="error-message">{error.email}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`login-input ${error.password ? 'input-error' : ''}`}
                        />
                        {error.password && <p className="error-message">{error.password}</p>}
                    </div>
                    {error.general && <p className="error-message general-error">{error.general}</p>}
                    <button type="submit" className="login-button">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;