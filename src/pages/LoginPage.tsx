import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useCustomForm } from "../hooks/useCustomForm";
import { useSession } from "../hooks/useSession";
import { authService } from "../services/authService";

import { object } from "yup";
import { stringRequired } from "../utils/yup";
import { Link } from "react-router-dom";

const loginSchema = object({
  username: stringRequired("DNI requerido")
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(10, "El DNI no debe superar los 10 caracteres"),
  password: stringRequired("Contraseña requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const LoginPage = () => {
  const { login } = useSession();

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => login(data),
    onError: () => toast.error("Error al iniciar sesión"),
  });

  const form = useCustomForm(loginSchema, {
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(({ password, username }) => {
    mutation.mutate({ password: password ?? "", username: username ?? "" });
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm bg-base-100 border border-base-300 shadow-xl rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Iniciar sesión</h2>
          <p className="text-base-content/70 text-sm mt-1">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">DNI</span>
            </label>
            <input
              type="text"
              placeholder="Ingresa tu DNI"
              className="input input-bordered w-full"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-error text-xs mt-1">{form.formState.errors.username.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="input input-bordered w-full"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-error text-xs mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={form.formState.isSubmitting}>
            {mutation.isPending ? "Iniciando..." : "Iniciar"}
          </button>
        </form>

        <div className="text-center text-sm text-base-content/70 pt-2 border-t border-base-300 space-y-2">
          <div>
            <span>¿Aún no tienes cuenta? </span>
            <Link to="/register" className="link link-primary font-semibold">
              Regístrate
            </Link>
          </div>
          <div className="text-xs">
            <span>¿Olvidaste tu contraseña? </span>
            <Link to="/recover" className="link link-primary font-semibold">
              Recuperar cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
