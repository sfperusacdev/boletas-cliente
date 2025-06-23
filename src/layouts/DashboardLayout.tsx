import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  CheckSquare,
  UserCog,
  LogOut,
  User,
  Menu,
  Signature,
} from "lucide-react";
import { useSession } from "../hooks/useSession";
import { useConfirmModal } from "../hooks/useConfirmModal";
import { useScreenSize } from "../hooks/useScreenSize";
import Div100vh from "react-div-100vh";

export const DashboardLayout = () => {
  const location = useLocation();
  const { openModal } = useConfirmModal();
  const { user, logout } = useSession();
  const { isMobile } = useScreenSize();
  const [menuOpen, setMenuOpen] = useState(!isMobile);

  const handleLogout = async () => {
    const result = await openModal(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
    );
    if (result) logout();
  };

  const handleLinkClick = () => {
    if (isMobile) setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-[250px_1fr] bg-base-200">
      {isMobile && (
        <div className="flex items-center justify-between bg-base-100 p-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-lg font-bold">Dashboard</div>
        </div>
      )}
      {(menuOpen || !isMobile) && (
        <aside className="bg-base-100 border-b md:border-b-0 md:border-r border-base-300 p-4 flex flex-col space-y-6 md:static absolute w-full md:w-auto z-50">
          <div className="flex flex-col items-center">
            {user?.user_info?.avatarUrl ? (
              <img
                src={user.user_info.avatarUrl}
                alt="Avatar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-base-300 flex items-center justify-center mb-2">
                <User className="w-10 h-10 md:w-12 md:h-12 text-base-content/70" />
              </div>
            )}
            <div className="text-center">
              <p className="font-semibold text-base md:text-lg">
                {user?.user_info?.username ?? ""}
              </p>
              <p className="text-xs md:text-sm text-base-content/70">
                {user?.user_info?.first_name ?? ""}
              </p>
            </div>
          </div>
          <nav className="flex flex-col items-start gap-2">
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className={`btn btn-ghost justify-start w-full ${location.pathname === "/dashboard" ? "btn-active" : ""}`}
            >
              <Home className="w-5 h-5 mr-2" /> Inicio
            </Link>
            <Link
              to="/dashboard/documentos/firmar"
              onClick={handleLinkClick}
              className={`btn btn-ghost justify-start w-full ${
                location.pathname === "/dashboard/documentos/firmar"
                  ? "btn-active"
                  : ""
              }`}
            >
              <CheckSquare className="w-5 h-5 mr-2" />{" "}
              <span className="text-start">Documentos por Firmar</span>
            </Link>
            <Link
              to="/dashboard/signature"
              onClick={handleLinkClick}
              className={`btn btn-ghost justify-start w-full ${
                location.pathname === "/dashboard/signature" ? "btn-active" : ""
              }`}
            >
              <Signature className="w-5 h-5 mr-2" /> Firma
            </Link>
            <Link
              to="/dashboard/perfil"
              onClick={handleLinkClick}
              className={`btn btn-ghost justify-start w-full ${
                location.pathname === "/dashboard/perfil" ? "btn-active" : ""
              }`}
            >
              <UserCog className="w-5 h-5 mr-2" /> Mi Perfil
            </Link>
            <button
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}
              className="btn btn-ghost text-error justify-start w-full"
            >
              <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
            </button>
          </nav>
        </aside>
      )}
      <Div100vh className="flex-1 overflow-y-auto">
        <Outlet />
      </Div100vh>
    </div>
  );
};
