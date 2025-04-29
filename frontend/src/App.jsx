import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Doctores from './pages/Doctores.jsx';
import PasswordRecovery from './pages/PasswordRecovery.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/doctores" element={<Doctores />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
        </Routes>
    );
}

export default App;