import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Player from "../player/Player";
import { ThemeProvider } from "../context/ThemeContext";
import { PlayerProvider } from "../context/PlayerContext";

export default function MainLayout({ children, onLogout }) {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <div className="bg-bg h-screen text-text flex overflow-hidden">
          <Sidebar onLogout={onLogout} />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
            <Footer />
          </div>
        </div>
        <Player />
      </PlayerProvider>
    </ThemeProvider>
  );
}