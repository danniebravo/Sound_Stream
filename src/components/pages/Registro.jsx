import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider } from "../context/ThemeContext";
import Notificacion from "../ui/Notificacion";

const IMAGEN_HEADER = "https://lh3.googleusercontent.com/aida-public/AB6AXuBgOJsecvJRLh8L_Wk5iCNiwJZE9BJZUejdIhyfItjW9v8Cr_K_U8Ib-N8Ig41_lQvosTml--UnefBZGzhhyC03qI57Af2qsdk9dN2LXpJRzFpdTHi3HJYuZa1wrIZOZsfVvTUdznmOeSMKwcyamJx5eBnPbuFyksCJSJXRd6quWKG1hJRokcz8YG1EMCLL9vcLEVvG1hAnodVcQxr5tYfGrSfcOJNahFrcskd0HOO9Sdte7HXAcbhnbMH28qK5MP9iAwvWGBY";

function Campo({ icono, label, type = "text", placeholder, extra, value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-text text-sm font-semibold block px-1">{label}</label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">{icono}</span>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-text placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
            </div>
            {extra}
        </div>
    );
}

function RegistroInner() {
    const { tema, toggleTema } = useTheme();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [avatar, setAvatar] = useState("");
    const [rol, setRol] = useState("usuario"); // 👈 nuevo estado
    const [notificacion, setNotificacion] = useState(null);

    const handleRegistro = async () => {
        try {
            await axios.post("http://localhost:8080/api/usuarios/registrar", {
                nombre,
                nombreUsuario,
                correo,
                contrasena,
                avatar,
                rol,               // 👈 se envía el rol
            });
            setNotificacion({ tipo: "exito", mensaje: "Registro exitoso. Redirigiendo..." });
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setNotificacion({ tipo: "error", mensaje: "Error al registrar. Intenta de nuevo." });
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-bg">
            {/* Header igual que antes */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-border z-50">
                <div className="flex items-center gap-2">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">library_music</span>
                    </div>
                    <h2 className="text-text text-xl font-bold leading-tight tracking-tight">SoundStream</h2>
                </div>
                <button
                    onClick={toggleTema}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-surface text-text hover:bg-primary/10 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined leading-none">
                        {tema === "dark" ? "light_mode" : "dark_mode"}
                    </span>
                </button>
            </header>

            <main className="w-full max-w-[480px] mt-16">
                <div className="bg-surface rounded-xl shadow-xl border border-border overflow-hidden">
                    <div
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url('${IMAGEN_HEADER}')` }}
                    />

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-text mb-2">Crear cuenta</h2>
                        <p className="text-text-muted text-sm leading-relaxed mb-8">Únete a nuestra comunidad musical</p>

                        <div className="space-y-5">
                            <Campo icono="person" label="Nombre" type="text" placeholder="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                            <Campo icono="badge" label="Nombre Usuario" type="text" placeholder="usuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />
                            <Campo icono="mail" label="Correo" type="email" placeholder="email@ejemplo.com" value={correo} onChange={e => setCorreo(e.target.value)} />
                            <Campo icono="lock" label="Contraseña" type="password" placeholder="••••••••" value={contrasena} onChange={e => setContrasena(e.target.value)} />
                            <Campo icono="image" label="Avatar URL (Opcional)" type="url" placeholder="https://..." value={avatar} onChange={e => setAvatar(e.target.value)} />

                            {/* 👇 Selector de rol */}
                            <div className="space-y-2">
                                <label className="text-text text-sm font-semibold block px-1">Rol</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">admin_panel_settings</span>
                                    <select
                                        value={rol}
                                        onChange={e => setRol(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-text appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                                    >
                                        <option value="usuario">Usuario</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            {notificacion && (
                                <Notificacion tipo={notificacion.tipo} mensaje={notificacion.mensaje} />
                            )}
                            <button onClick={handleRegistro} className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer">
                                Registrarse
                            </button>
                        </div>

                        <p className="text-center mt-8 text-sm text-text-muted">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="text-primary font-bold hover:underline cursor-pointer">Iniciar sesión</a>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6 text-xs text-text-muted font-medium">
                    <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
                    <a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
                    <a className="hover:text-primary transition-colors cursor-pointer">Support</a>
                </div>
            </main>
        </div>
    );
}

export default function Registro() {
    return (
        <ThemeProvider>
            <RegistroInner />
        </ThemeProvider>
    );
}