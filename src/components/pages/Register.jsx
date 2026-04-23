import { useTheme } from "../context/ThemeContext";
import { ThemeProvider } from "../context/ThemeContext";

const IMAGEN_HEADER = "https://lh3.googleusercontent.com/aida-public/AB6AXuBgOJsecvJRLh8L_Wk5iCNiwJZE9BJZUejdIhyfItjW9v8Cr_K_U8Ib-N8Ig41_lQvosTml--UnefBZGzhhyC03qI57Af2qsdk9dN2LXpJRzFpdTHi3HJYuZa1wrIZOZsfVvTUdznmOeSMKwcyamJx5eBnPbuFyksCJSJXRd6quWKG1hJRokcz8YG1EMCLL9vcLEVvG1hAnodVcQxr5tYfGrSfcOJNahFrcskd0HOO9Sdte7HXAcbhnbMH28qK5MP9iAwvWGBY";

function Campo({ icono, label, type = "text", placeholder, extra }) {
    return (
        <div className="space-y-2">
            <label className="text-text text-sm font-semibold block px-1">{label}</label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">{icono}</span>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-text placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
            </div>
            {extra}
        </div>
    );
}

function RegistroInner() {
    const { tema, toggleTema } = useTheme();

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-bg">

            {/* Header */}
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

            {/* Card */}
            <main className="w-full max-w-[480px] mt-16">
                <div className="bg-surface rounded-xl shadow-xl border border-border overflow-hidden">

                    {/* Imagen header */}
                    <div
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url('${IMAGEN_HEADER}')` }}
                    />

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-text mb-2">Crear cuenta</h2>
                        <p className="text-text-muted text-sm leading-relaxed mb-8">Únete a nuestra comunidad musical</p>

                        <div className="space-y-5">
                            <Campo icono="person" label="Nombre" type="text" placeholder="nombre" />
                            <Campo icono="badge" label="Nombre Usuario" type="text" placeholder="usuario" />
                            <Campo icono="mail" label="Correo" type="email" placeholder="email@ejemplo.com" />
                            <Campo icono="lock" label="Contraseña" type="password" placeholder="••••••••" />
                            <Campo icono="image" label="Avatar URL (Opcional)" type="url" placeholder="https://..." />
                            <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer">
                                Registrarse
                            </button>
                        </div>

                        <p className="text-center mt-8 text-sm text-text-muted">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="text-primary font-bold hover:underline cursor-pointer">Iniciar sesión</a>
                        </p>
                    </div>
                </div>

                {/* Policy links */}
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