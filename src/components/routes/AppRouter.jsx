import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Inicio from '../pages/Inicio';
import Buscar from '../pages/Buscar';
import Perfil from '../pages/Perfil';
import NotFound from '../pages/NotFound';
import Biblioteca from '../pages/Biblioteca';

export default function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/inicio" /> : <Login onLogin={handleLogin} />                } />
                <Route path="/registro" element={isAuthenticated ? <Navigate to="/inicio" /> : <Registro />} />
                <Route path="/inicio" element={isAuthenticated ? <Inicio onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/buscar" element={isAuthenticated ? <Buscar /> : <Navigate to="/login" />} />
                <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
                <Route path="/biblioteca" element={isAuthenticated ? <Biblioteca /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    )
}
