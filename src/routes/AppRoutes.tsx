import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSession } from "../hooks/useSession";
import { LoginPage } from "../pages/LoginPage";
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { RecoverAccountPage } from "../pages/RecoverAccountPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardProfile } from "../pages/dashboard/ProfilePage";
import { PdfViewAndSignPage } from "../pages/dashboard/PdfViewAndSignPage";
import Sample from "../pages/Sample";
import { DocumentosPage } from "../pages/dashboard/DocumentosPage";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  const isAuthenticated = !!user;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  const isAuthenticated = !!user;

  // Si el usuario está autenticado, redirigimos a la página de dashboard
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (login, registro, recuperación) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <CreateAccountPage />
            </PublicRoute>
          }
        />
        <Route
          path="/recover"
          element={
            <PublicRoute>
              <RecoverAccountPage />
            </PublicRoute>
          }
        />

        {/* Rutas privadas (dashboard) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DocumentosPage />} />
          <Route path="pdf/:pdfname/:estado" element={<PdfViewAndSignPage />} />
          <Route path="documentos/firmar" element={<DocumentosPage tosign />} />
          <Route path="perfil" element={<DashboardProfile />} />
          <Route path="sample" element={<Sample />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
