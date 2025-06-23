import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const InputField = ({
  label,
  error,
  registration,
  placeholder,
  ...props
}: InputFieldProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-medium">{label}</label>
      <input
        {...registration}
        {...props}
        className="input input-bordered w-full"
        placeholder={placeholder}
      />
      {error && <p className="text-xs text-error mt-1">{error.message}</p>}
    </div>
  );
};
