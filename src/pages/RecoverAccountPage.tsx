import * as yup from "yup";
import { stringRequired } from "../utils/yup";
import { useCustomForm } from "../hooks/useCustomForm";
import { InputField } from "../components/fields/InputField";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const recoverSchema = yup.object({
  dni: stringRequired()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(10, "El DNI no debe superar los 10 caracteres"),
});

export const RecoverAccountPage = () => {
  const form = useCustomForm(recoverSchema);
  const mutation = useMutation({
    mutationFn: authService.recoverAccount,
    onError: () =>
      toast.error(
        "Hubo un problema al enviar el correo con las instrucciones. Intenta nuevamente",
      ),
    onSuccess: () => form.reset(),
  });

  const handleFormSumit = form.handleSubmit(data => mutation.mutate(data.dni));
  if (mutation.isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
        <div className="w-full max-w-sm bg-base-100 border border-base-300 shadow-xl rounded-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Recuperar cuenta</h2>
            <p className="text-base-content/70 text-sm mt-1">
              Se envió un correo con las instrucciones a{" "}
              <span className="font-bold">{mutation.data?.["email"]}</span>
            </p>
          </div>
          <div className="text-center text-sm text-base-content/70 pt-2 border-t border-base-300">
            <Link
              to="/login"
              replace
              className="link link-primary font-semibold"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-sm bg-base-100 border border-base-300 shadow-xl rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Recuperar cuenta</h2>
          <p className="text-base-content/70 text-sm mt-1">
            Ingresa tu DNI para recuperar tu cuenta
          </p>
        </div>
        <form onSubmit={handleFormSumit} className="space-y-5">
          <InputField
            label="DNI"
            registration={form.register("dni")}
            error={form.formState.errors.dni}
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>
        <div className="text-center text-sm text-base-content/70 pt-2 border-t border-base-300">
          <span>¿Ya recordaste tu contraseña? </span>
          <Link to="/login" replace className="link link-primary font-semibold">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
