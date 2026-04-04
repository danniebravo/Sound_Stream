import MainLayout from "./components/layout/MainLayout.jsx";
import Button from "./components/ui/Button.jsx";
import Input from "./components/ui/Input.jsx";
import Modal from "./components/ui/Modal.jsx";
import Loader from "./components/ui/Loader.jsx";
import Notificacion from "./components/ui/Notificacion.jsx";

function App() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Panel principal</h1>
        <p className="text-text-muted text-sm mt-1">
          Vista previa de los componentes del sistema de interfaz
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Botones */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">smart_button</span>
            <h2 className="text-base font-semibold text-text">Botones</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Input / Búsqueda */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">text_fields</span>
            <h2 className="text-base font-semibold text-text">Campos de texto</h2>
          </div>
          <div className="space-y-3">
            <Input icon="search" placeholder="Buscar canciones..." />
            <Input icon="person" placeholder="Nombre de usuario..." />
          </div>
        </div>

        {/* Loader */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">progress_activity</span>
            <h2 className="text-base font-semibold text-text">Estado de carga</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Loader size="w-8 h-8" />
              <span className="text-text-muted text-xs">Pequeño</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader />
              <span className="text-text-muted text-xs">Normal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader size="w-14 h-14" />
              <span className="text-text-muted text-xs">Grande</span>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">notifications</span>
            <h2 className="text-base font-semibold text-text">Notificaciones</h2>
          </div>
          <div className="space-y-3">
            <Notificacion fixed={false} tipo="exito" mensaje="Playlist creada correctamente" />
            <Notificacion fixed={false} tipo="error" mensaje="Error al reproducir la canción" />
          </div>
        </div>

        {/* Modal inline */}
        <div className="bg-surface rounded-xl p-6 border border-border lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-xl">web_asset</span>
            <h2 className="text-base font-semibold text-text">Modal</h2>
          </div>
          <div className="flex justify-center">
            <Modal title="Nueva playlist" overlay={false}>
              Escribe el nombre de tu nueva playlist y selecciona las canciones que quieres agregar.
            </Modal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
