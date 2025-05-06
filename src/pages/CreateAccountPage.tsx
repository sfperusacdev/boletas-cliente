import * as yup from "yup";
import { emailRequired, phoneRequired, stringRequired } from "../utils/yup";
import { useCustomForm } from "../hooks/useCustomForm";
import { InputField } from "../components/fields/InputField";
import { SelectField } from "../components/fields/SelectField";
import { PasswordField } from "../components/fields/PasswordField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const registerSchema = yup.object({
  dni: stringRequired()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(10, "El DNI no debe superar los 10 caracteres"),
  first_name: stringRequired("Nombre requerido"),
  last_name_paterno: stringRequired("Apellido paterno requerido"),
  last_name_materno: stringRequired("Apellido materno requerido"),
  email: emailRequired("Correo requerido"),
  phone: phoneRequired("Debe ser un número de celular válido de 9 dígitos"),
  gender: stringRequired("Género requerido").oneOf(["f", "m"], "Selecciona un género válido"),
  new_password: stringRequired().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirm_password: stringRequired().oneOf([yup.ref("new_password")], "Las nuevas contraseñas no coinciden"),
});

export const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const form = useCustomForm(registerSchema);

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Usuario registrado con éxito");
      navigate("/login", { replace: true });
    },
    onError: () => toast.error("Error al registrar el usuario"),
  });

  const goToStop2 = async () => {
    const isValid = await form.trigger(["first_name", "last_name_materno", "last_name_paterno", "gender"]);
    if (isValid) setStep(2);
  };

  const formSubmitHandle = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 border border-base-300 shadow-xl rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Crear cuenta</h2>
          <p className="text-base-content/70 text-sm mt-1">Completa el formulario para registrarte</p>
        </div>
        <div className="flex justify-center">
          <ul className="steps flex">
            <li className={classNames("step", { "step-primary": step > 0 })} onClick={() => setStep(1)} />
            <li className={classNames("step", { "step-primary": step > 1 })} />
          </ul>
        </div>
        <form onSubmit={formSubmitHandle} className="space-y-4">
          {step === 1 && (
            <>
              <InputField
                label="Nombre"
                registration={form.register("first_name")}
                error={form.formState.errors.first_name}
              />
              <InputField
                label="Apellido paterno"
                registration={form.register("last_name_paterno")}
                error={form.formState.errors.last_name_paterno}
              />
              <InputField
                label="Apellido materno"
                registration={form.register("last_name_materno")}
                error={form.formState.errors.last_name_materno}
              />
              <SelectField
                label="Género"
                registration={form.register("gender")}
                error={form.formState.errors.gender}
                options={[
                  { label: "Femenino", value: "f" },
                  { label: "Masculino", value: "m" },
                ]}
              />

              <div className="text-center mt-4">
                <button type="button" onClick={goToStop2} className="btn btn-primary">
                  Siguiente
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <InputField label="DNI" registration={form.register("dni")} error={form.formState.errors.dni} />
              <InputField
                label="Correo electrónico"
                registration={form.register("email")}
                error={form.formState.errors.email}
              />
              <InputField label="Teléfono" registration={form.register("phone")} error={form.formState.errors.phone} />
              <div className="grid grid-cols-2 gap-4">
                <PasswordField
                  label="Contraseña"
                  registration={form.register("new_password")}
                  error={form.formState.errors.new_password}
                />
                <PasswordField
                  label="Confirmar contraseña"
                  registration={form.register("confirm_password")}
                  error={form.formState.errors.confirm_password}
                />
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Crear cuenta
                </button>
              </div>
            </>
          )}
        </form>

        <div className="text-center text-sm text-base-content/70 pt-2 border-t border-base-300">
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" replace className="link link-primary font-semibold">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
