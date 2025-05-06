import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const PasswordField = ({ label, error, registration, ...props }: PasswordFieldProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-medium">{label}</label>
      <input
        type="password"
        {...registration}
        {...props}
        className="input input-bordered w-full"
      />
      {error && <p className="text-xs text-error mt-1">{error.message}</p>}
    </div>
  );
};
