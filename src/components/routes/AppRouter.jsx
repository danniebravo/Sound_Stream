import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Buscar from '../pages/Buscar';
import Perfil from '../pages/Perfil';
import NotFound from '../pages/NotFound';
import Biblioteca from '../pages/Biblioteca';
import { Navigate } from 'react-router-dom';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/buscar" element={<Buscar />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    )
}
