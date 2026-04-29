import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Inicio from '../pages/Inicio';
import Buscar from '../pages/Buscar';
import Perfil from '../pages/Perfil';
import NotFound from '../pages/NotFound';
import Biblioteca from '../pages/Biblioteca';

export default function AppRouter() {
    const isAuthenticated = localStorage.getItem("usuario") !== null;

    const handleLogin = () => {
        window.location.href = "/inicio";
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        window.location.href = "/login";
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/inicio" /> : <Login onLogin={handleLogin} />} />
                <Route path="/registro" element={isAuthenticated ? <Navigate to="/inicio" /> : <Registro />} />
                <Route path="/inicio" element={isAuthenticated ? <Inicio onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/buscar" element={isAuthenticated ? <Buscar onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/perfil" element={isAuthenticated ? <Perfil onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/biblioteca" element={isAuthenticated ? <Biblioteca onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound onLogout={handleLogout} />} />
            </Routes>
        </BrowserRouter >
    )
}
