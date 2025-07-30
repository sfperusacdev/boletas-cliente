import { useState } from "react";
import logo from "../images/notificasf_sin_fondo.svg";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 dark:bg-black/80 backdrop-blur-sm z-50 shadow-sm">
      <nav className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-15 w-auto" src={logo} alt="Logo" />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden cursor-pointer z-50"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex absolute md:static top-full right-0 bg-white dark:bg-black md:bg-transparent w-full md:w-auto flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center px-6 md:px-0 py-4 md:py-0 shadow md:shadow-none z-40`}
        >
          <a
            href="#inicio"
            className="block w-full md:w-auto text-black dark:text-white"
          >
            Inicio
          </a>
          <a
            href="#soluciones"
            className="block w-full md:w-auto text-black dark:text-white"
          >
            Solución
          </a>
          <a
            href="#beneficios"
            className="block w-full md:w-auto text-black dark:text-white"
          >
            Beneficios
          </a>
          <a
            href="#precios"
            className="block w-full md:w-auto text-black dark:text-white"
          >
            Precios
          </a>
          <a
            href="https://wa.link/am97ka"
            target="_blank"
            rel="noopener noreferrer"
            className="button-componen w-full md:w-auto text-center text-black rounded-md px-4 py-2 transition"
          >
            Contáctanos
          </a>
          {/* <button
            onClick={() => {
              window.open("https://notificasf.com/login", "_blank", "noopener,noreferrer");
            }}
            className="button-componen w-full md:w-auto text-center bg-[#0d263b] text-white rounded-md px-4 py-2 hover:bg-[#417c3f] transition"
          >
            Iniciar Sesión
          </button> */}
        </div>
      </nav>
    </header>
  );
};
