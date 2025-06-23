import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { EntryPointRedirectLink } from "../pages/EntryPointRedirectLink";
import { SignatureImport } from "../pages/dashboard/SignatureImport";
import { LandingPage } from "../pages/landing/LandingPage";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = useSession();
  const isAuthenticated = !!user;
  let state = undefined;
  if (location.pathname.startsWith("/_sign/")) {
    state = { from: location.pathname };
  }
  return isAuthenticated ? children : <Navigate to="/login" replace state={state} />;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  const isAuthenticated = !!user;
  const location = useLocation();
  // Si el usuario está autenticado, redirigimos a la página de dashboard
  if (!isAuthenticated) return children;
  if (location.state?.from) return <Navigate to={location.state.from} replace />;
  return <Navigate to="/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (login, registro, recuperación) */}
        <Route path="/" element={<LandingPage />} />
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
          path="/_sign/:empresa/:record_codigo/:origin"
          element={
            <PrivateRoute>
              <EntryPointRedirectLink />
            </PrivateRoute>
          }
        />
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
          <Route path="signature" element={<SignatureImport />} />
          <Route path="sample" element={<Sample />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
