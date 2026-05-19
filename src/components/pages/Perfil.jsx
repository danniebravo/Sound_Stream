import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import SongList from "../music/SongList";
import ModalVerPlaylist from "../music/ModalVerPlaylist";

// ── Modal Editar Perfil (propio) ──────────────────────────────────────────
function ModalEditarPerfil({ usuario, onCerrar, onActualizado }) {
    const [nombre, setNombre] = useState(usuario.nombre ?? "");
    const [avatar, setAvatar] = useState(usuario.avatar ?? "");
    const [contrasena, setContrasena] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const guardar = async () => {
        if (!nombre.trim()) { setError("El nombre es obligatorio"); return; }
        setGuardando(true);
        setError("");
        try {
            const body = {
                nombre,
                nombreUsuario: usuario.nombreUsuario,
                correo: usuario.correo,
                contrasena: contrasena || usuario.contrasena,
                avatar,
                rol: usuario.rol,
            };
            const res = await axios.put(`http://localhost:8080/api/usuarios/${usuario.id}`, body);
            sessionStorage.setItem("usuario", JSON.stringify(res.data));
            onActualizado(res.data);
            onCerrar();
        } catch {
            setError("Error al guardar. Intenta de nuevo.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-4">Editar Perfil</h3>

                <div className="flex gap-3 items-center mb-4">
                    <div className="size-14 rounded-xl bg-border border border-border shrink-0 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-text-muted">person</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">URL Avatar</label>
                        <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className="input-sp w-full" placeholder="https://..." />
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nombre *</label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nueva contraseña</label>
                        <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder="Dejar en blanco para no cambiar" className="input-sp w-full" />
                    </div>
                </div>

                {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

                <div className="flex gap-2 mt-5">
                    <button onClick={guardar} disabled={guardando}
                        className="flex-1 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 cursor-pointer disabled:opacity-60">
                        {guardando ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={onCerrar}
                        className="flex-1 py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Modal Editar Usuario (por Administrador) ─────────────────────────────
function ModalEditarUsuarioAdmin({ usuario, onCerrar, onActualizado }) {
    const [nombre, setNombre] = useState(usuario.nombre ?? "");
    const [nombreUsuario, setNombreUsuario] = useState(usuario.nombreUsuario ?? "");
    const [correo, setCorreo] = useState(usuario.correo ?? "");
    const [avatar, setAvatar] = useState(usuario.avatar ?? "");
    const [rol, setRol] = useState(usuario.rol ?? "usuario");
    const [contrasena, setContrasena] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const guardar = async () => {
        if (!nombre.trim()) { setError("El nombre es obligatorio"); return; }
        setGuardando(true);
        setError("");
        try {
            const body = {
                nombre,
                nombreUsuario,
                correo,
                contrasena: contrasena || undefined, // si está vacío, no mandar o mandar null (backend decide)
                avatar,
                rol,
            };
            const res = await axios.put(`http://localhost:8080/api/usuarios/${usuario.id}`, body);
            onActualizado(res.data);
            onCerrar();
        } catch (err) {
            setError("Error al guardar. Intenta de nuevo.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <h3 className="text-base font-black text-text mb-4">Editar Usuario (Admin)</h3>

                <div className="flex gap-3 items-center mb-4">
                    <div className="size-14 rounded-xl bg-border border border-border shrink-0 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-text-muted">person</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">URL Avatar</label>
                        <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className="input-sp w-full" placeholder="https://..." />
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nombre *</label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nombre de usuario</label>
                        <input type="text" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Correo</label>
                        <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Nueva contraseña</label>
                        <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder="Dejar en blanco para no cambiar" className="input-sp w-full" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Rol</label>
                        <select value={rol} onChange={e => setRol(e.target.value)} className="input-sp w-full">
                            <option value="usuario">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                </div>

                {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

                <div className="flex gap-2 mt-5">
                    <button onClick={guardar} disabled={guardando}
                        className="flex-1 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 cursor-pointer disabled:opacity-60">
                        {guardando ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={onCerrar}
                        className="flex-1 py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Modal Admin: ver todos los usuarios + editar/eliminar ─────────────────
function ModalAdmin({ onCerrar }) {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [usuarioEditando, setUsuarioEditando] = useState(null); // usuario a editar

    const cargarUsuarios = () => {
        setCargando(true);
        axios.get("http://localhost:8080/api/usuarios")
            .then(res => setUsuarios(res.data))
            .catch(() => setUsuarios([]))
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const eliminarUsuario = async (id, nombre) => {
        if (!window.confirm(`¿Eliminar definitivamente a "${nombre}"?`)) return;
        try {
            await axios.delete(`http://localhost:8080/api/usuarios/${id}`);
            cargarUsuarios(); // refrescar tabla
        } catch (err) {
            alert("Error al eliminar el usuario");
        }
    };

    const actualizarUsuarioEnLista = (usuarioActualizado) => {
        setUsuarios(prev =>
            prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u)
        );
    };

    const filtrados = usuarios.filter(u =>
        u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.correo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.nombreUsuario?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCerrar} />
            <div className="relative bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-3xl z-10 flex flex-col max-h-[85vh]">

                <div className="flex items-center gap-3 p-5 border-b border-border shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-lg">admin_panel_settings</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-black text-text">Panel de Administrador</h3>
                        <p className="text-xs text-text-muted">{cargando ? "Cargando..." : `${usuarios.length} usuarios registrados`}</p>
                    </div>
                    <button onClick={onCerrar}
                        className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:opacity-80 cursor-pointer">
                        <span className="material-symbols-outlined text-text-muted text-base">close</span>
                    </button>
                </div>

                <div className="px-5 pt-4 shrink-0">
                    <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre, correo o usuario..."
                        className="input-sp w-full" />
                </div>

                <div className="overflow-y-auto flex-1 p-4">
                    {cargando && (
                        <div className="flex justify-center py-10">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {!cargando && filtrados.length === 0 && (
                        <p className="text-center text-text-muted text-sm py-8">No se encontraron usuarios.</p>
                    )}

                    {!cargando && filtrados.length > 0 && (
                        <div className="overflow-x-auto rounded-xl border border-border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-surface border-b border-border">
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">ID</th>
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Nombre</th>
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Usuario</th>
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Correo</th>
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Rol</th>
                                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtrados.map((u, i) => (
                                        <tr key={u.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-surface/50"}`}>
                                            <td className="px-4 py-3 text-text-muted tabular-nums">{u.id}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {u.avatar ? (
                                                        <img src={u.avatar} alt={u.nombre} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                                    ) : (
                                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                            <span className="material-symbols-outlined text-primary text-sm">person</span>
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-text truncate">{u.nombre}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-text-muted">@{u.nombreUsuario}</td>
                                            <td className="px-4 py-3 text-text-muted truncate max-w-[180px]">{u.correo}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.rol === "admin" ? "bg-primary/15 text-primary" : "bg-surface text-text-muted border border-border"}`}>
                                                    {u.rol ?? "usuario"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setUsuarioEditando(u)}
                                                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                                                        title="Editar usuario"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => eliminarUsuario(u.id, u.nombre)}
                                                        className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                                                        title="Eliminar usuario"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-border shrink-0">
                    <button onClick={onCerrar}
                        className="w-full py-2.5 bg-surface border border-border text-text font-bold text-sm rounded-xl hover:opacity-80 cursor-pointer">
                        Cerrar
                    </button>
                </div>
            </div>

            {/* Modal de edición para administrador */}
            {usuarioEditando && (
                <ModalEditarUsuarioAdmin
                    usuario={usuarioEditando}
                    onCerrar={() => setUsuarioEditando(null)}
                    onActualizado={(usuarioActualizado) => {
                        actualizarUsuarioEnLista(usuarioActualizado);
                        setUsuarioEditando(null);
                    }}
                />
            )}
        </div>
    );
}

// ── Componente principal (sin cambios, solo se importa el ModalAdmin modificado) ──
export default function Perfil({ onLogout }) {
    const [usuario, setUsuario] = useState(() => JSON.parse(sessionStorage.getItem("usuario") || "{}"));
    const [playlists, setPlaylists] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [playlistSeleccionada, setPlaylistSeleccionada] = useState(null);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalAdmin, setModalAdmin] = useState(false);
    const esAdmin = usuario.rol === "admin";

    // Cargar playlists reales
    useEffect(() => {
        if (!usuario.id) return;
        axios.get(`http://localhost:8080/api/playlists/usuario/${usuario.id}`)
            .then(res => setPlaylists(res.data))
            .catch(() => setPlaylists([]));
    }, [usuario.id]);

    // Cargar favoritos desde localStorage + iTunes
    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem("favoritos") || "[]");
        if (ids.length === 0) { setFavoritos([]); return; }
        Promise.all(
            ids.map(id =>
                axios.get(`https://itunes.apple.com/lookup?id=${id}`)
                    .then(res => res.data.results?.[0] ?? null)
                    .catch(() => null)
            )
        ).then(results => setFavoritos(results.filter(Boolean)));
    }, []);

    const stats = [
        { label: "Playlists", valor: playlists.length, subtexto: "Creadas por ti", icono: "library_music" },
        { label: "Me gusta", valor: favoritos.length, subtexto: "Canciones favoritas", icono: "favorite" },
        { label: "Canciones", valor: playlists.reduce((acc, pl) => acc + (pl.canciones?.length ?? 0), 0), subtexto: "En tus playlists", icono: "music_note" },
    ];

    return (
        <MainLayout onLogout={onLogout}>
            <div className="max-w-3xl mx-auto">

                {/* Avatar + nombre (igual) */}
                <div className="flex flex-col items-center gap-4 py-8">
                    <div className="relative">
                        {usuario.avatar ? (
                            <img src={usuario.avatar} alt={usuario.nombre}
                                className="size-32 md:size-40 rounded-full border-4 border-border shadow-sm object-cover" />
                        ) : (
                            <div className="size-32 md:size-40 rounded-full border-4 border-border bg-surface flex items-center justify-center">
                                <span className="material-symbols-outlined text-text-muted text-6xl">person</span>
                            </div>
                        )}
                        <button onClick={() => setModalEditar(true)}
                            className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-bg cursor-pointer hover:opacity-90">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight text-text">{usuario.nombre}</h1>
                            {esAdmin && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/20">
                                    Admin
                                </span>
                            )}
                        </div>
                        <p className="text-text-muted text-base mt-1">@{usuario.nombreUsuario}</p>
                        <p className="text-text-muted text-sm">{usuario.correo}</p>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => setModalEditar(true)}
                            className="px-6 h-11 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 cursor-pointer">
                            Editar Perfil
                        </button>
                        {esAdmin && (
                            <button onClick={() => setModalAdmin(true)}
                                className="px-4 h-11 bg-surface border border-border text-text text-sm font-bold rounded-xl hover:opacity-80 cursor-pointer flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">admin_panel_settings</span>
                                Usuarios
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {stats.map(stat => (
                        <div key={stat.label} className="flex flex-col gap-2 rounded-xl p-6 bg-surface hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between">
                                <p className="text-primary text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                <span className="material-symbols-outlined text-primary text-sm">{stat.icono}</span>
                            </div>
                            <p className="text-text text-3xl font-bold tracking-tight">{stat.valor}</p>
                            <p className="text-text-muted text-sm font-medium">{stat.subtexto}</p>
                        </div>
                    ))}
                </div>

                {/* Mis Playlists */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text">Mis Playlists</h2>
                    </div>
                    {playlists.length === 0 ? (
                        <p className="text-text-muted text-sm">Aún no tienes playlists. ¡Crea una en Biblioteca!</p>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {playlists.map(pl => (
                                <div key={pl.id} onClick={() => setPlaylistSeleccionada(pl)}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface cursor-pointer transition-colors group">
                                    <div className="size-11 rounded-lg overflow-hidden shrink-0 bg-primary/10 border border-border">
                                        {pl.portada ? (
                                            <img src={pl.portada} alt={pl.nombre} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-lg">queue_music</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-text font-semibold text-sm truncate">{pl.nombre}</p>
                                        <p className="text-text-muted text-xs">{pl.descripcion || "Sin descripción"}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-text-muted text-lg group-hover:text-primary transition-colors">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Favoritos */}
                <section className="pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text">Tus Favoritos</h2>
                    </div>
                    {favoritos.length === 0 ? (
                        <p className="text-text-muted text-sm">Aún no tienes favoritos. ¡Dale ❤️ a una canción en el reproductor!</p>
                    ) : (
                        <SongList canciones={favoritos} mostrarIndice={true} textoVacio="No tienes favoritos aún" />
                    )}
                </section>
            </div>

            {/* Modales */}
            {modalEditar && (
                <ModalEditarPerfil usuario={usuario} onCerrar={() => setModalEditar(false)} onActualizado={setUsuario} />
            )}
            {modalAdmin && <ModalAdmin onCerrar={() => setModalAdmin(false)} />}
            {playlistSeleccionada && (
                <ModalVerPlaylist playlist={playlistSeleccionada} onCerrar={() => setPlaylistSeleccionada(null)} />
            )}
        </MainLayout>
    );
}