import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { profileService } from "../../services/profileService";
import { InputField } from "../../components/fields/InputField";
import { SelectField } from "../../components/fields/SelectField";
import { PasswordField } from "../../components/fields/PasswordField";
import { useCustomForm } from "../../hooks/useCustomForm";
import * as yup from "yup";
import { UserSession } from "../../types/auth";
import { useEffect } from "react";
import {
  emailRequired,
  phoneRequired,
  stringNullable,
  stringRequired,
} from "../../utils/yup";

const profileSchema = yup.object({
  first_name: stringRequired("Nombre requerido"),
  last_name_paterno: stringRequired("Apellido paterno requerido"),
  last_name_materno: stringRequired("Apellido materno requerido"),
  email: emailRequired("Correo requerido"),
  phone: phoneRequired("Debe ser un número de celular válido de 9 dígitos"),
  gender: stringRequired("Género requerido").oneOf(
    ["f", "m"],
    "Selecciona un género válido",
  ),
  current_password: stringNullable(),
  new_password: stringNullable(),
  confirm_password: stringNullable().oneOf(
    [yup.ref("new_password")],
    "Las nuevas contraseñas no coinciden",
  ),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

export const DashboardProfile = () => {
  const mutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      toast.success("Perfil actualizado exitosamente");
      form.setValue("current_password", "");
      form.setValue("new_password", "");
      form.setValue("confirm_password", "");
    },
    onError: () => toast.error("Error al actualizar el perfil"),
  });

  const form = useCustomForm(profileSchema);

  const { isLoading, isError, data, refetch } = useQuery<
    UserSession["user_info"]
  >({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });
  useEffect(() => {
    if (data == null) return;
    form.reset({
      email: data.email,
      first_name: data.first_name,
      gender: data.gender as "f" | "m",
      last_name_materno: data.last_name_materno,
      last_name_paterno: data.last_name_paterno,
      phone: data.phone,
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  }, [data]);

  const onSubmit = (data: ProfileFormData) => mutation.mutate(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-lg font-semibold text-error">
          No se pudo cargar tu perfil.
        </p>
        <button className="btn btn-primary" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full px-4 md:px-10 py-8 space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Mi Perfil</h1>
        <p className="text-sm text-muted-foreground">
          Actualiza tu información personal
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
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
        <InputField
          label="Correo electrónico"
          registration={form.register("email")}
          error={form.formState.errors.email}
        />
        <InputField
          label="Teléfono"
          registration={form.register("phone")}
          error={form.formState.errors.phone}
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

        {/* Sección cambio de contraseña */}
        <div className="md:col-span-2 pt-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Cambio de contraseña</h2>
            <p className="text-sm text-muted-foreground">
              Completa los campos si deseas actualizar tu contraseña.
            </p>
          </div>

          <PasswordField
            label="Contraseña actual"
            registration={form.register("current_password")}
            error={form.formState.errors.current_password}
          />
          <PasswordField
            label="Nueva contraseña"
            registration={form.register("new_password")}
            error={form.formState.errors.new_password}
          />
          <PasswordField
            label="Confirmar nueva contraseña"
            registration={form.register("confirm_password")}
            error={form.formState.errors.confirm_password}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};
