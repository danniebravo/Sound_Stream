import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function Campo({ icono, label, tipo = "text", placeholder, extra, value, onChange }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
                <label className="text-text text-sm font-semibold">{label}</label>
                {extra}
            </div>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">
                    {icono}
                </span>
                <input
                    type={tipo}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-text placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
            </div>
        </div>
    );
}

function LoginInner() {
    const [vista, setVista] = useState("login");
    const { tema, toggleTema } = useTheme();
    const navigate = useNavigate();

    // Estados del login
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/usuarios/login", {
                correo,
                contrasena,
            });
            console.log("Usuario:", response.data);
            navigate("/home");
        } catch (err) {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-bg">

            {/* Header */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-border z-50">
                <div className="flex items-center gap-2">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">library_music</span>
                    </div>
                    <h2 className="text-text text-xl font-bold tracking-tight">SoundStream</h2>
                </div>
                <button
                    onClick={toggleTema}
                    className="w-10 h-10 rounded-full bg-surface text-text hover:bg-primary/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined leading-none">
                        {tema === "dark" ? "light_mode" : "dark_mode"}
                    </span>
                </button>
            </header>

            {/* Card */}
            <main className="w-full max-w-[480px] mt-16">
                <div className="bg-surface rounded-xl shadow-xl border border-border overflow-hidden">

                    {/* Banner */}
                    <div
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://picsum.photos/800/300?random=42&grayscale')" }}
                    />

                    <div className="p-8">
                        {vista === "login" && (
                            <>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-text mb-2">Bienvenido</h1>
                                    <p className="text-text-muted text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
                                </div>

                                <div className="space-y-5">
                                    <Campo
                                        icono="mail"
                                        label="Correo Electrónico"
                                        tipo="email"
                                        placeholder="nombre@email.com"
                                        value={correo}
                                        onChange={e => setCorreo(e.target.value)}
                                    />
                                    <Campo
                                        icono="lock"
                                        label="Contraseña"
                                        tipo="password"
                                        placeholder="••••••••"
                                        value={contrasena}
                                        onChange={e => setContrasena(e.target.value)}
                                        extra={
                                            <a href="#" className="text-primary text-xs font-semibold hover:underline">
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        }
                                    />

                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                    <button
                                        onClick={handleLogin}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 cursor-pointer">
                                        Iniciar Sesión
                                    </button>
                                </div>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-surface px-3 text-text-muted font-medium tracking-wider">SoundStream</span>
                                    </div>
                                </div>

                                <p className="text-center text-sm text-text-muted">
                                    ¿No tienes una cuenta?{" "}
                                    <button onClick={() => setVista("registro")} className="text-primary font-bold hover:underline cursor-pointer">
                                        Crear una cuenta
                                    </button>
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6 text-xs text-text-muted font-medium">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </main>
        </div>
    );
}

export default function Login() {
    return (
        <ThemeProvider>
            <LoginInner />
        </ThemeProvider>
    );
}