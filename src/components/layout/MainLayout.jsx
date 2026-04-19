import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "../context/ThemeContext";

export default function MainLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="bg-bg h-screen text-text flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}