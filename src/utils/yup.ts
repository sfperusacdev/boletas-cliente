import * as yup from "yup";

const DEFAULT_REQUIRED_MESSAGE = "Este campo es requerido";
const DEFAULT_TYPE_BOOLEAN_ERROR = "El tipo de dato debe ser booleano";
const DEFAULT_TYPE_NUMBER_ERROR = "Este campo debe ser un valor numérico";
const DEFAULT_POSITIVE_NUMBER_ERROR = "Este campo debe ser un valor numérico positivo";
const DEFAULT_EMAIL_ERROR = "Introduce una dirección de correo electrónico válida";
const DEFAULT_REQUIRED_EMAIL_ERROR = "El correo electrónico es obligatorio";
const DEFAULT_REGEX_ERROR = "El valor de este campo es inválido";
const DEFAULT_PHONE_ERROR = "Introduce un número de celular válido";

export const sanitizeString = (value: unknown) => {
  if (value == null) return null;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

export const stringRequired = (message = DEFAULT_REQUIRED_MESSAGE) =>
  yup.string().transform(sanitizeString).required(message);

export const booleanRequired = (message = DEFAULT_REQUIRED_MESSAGE) =>
  yup.boolean().transform(sanitizeString).typeError(DEFAULT_TYPE_BOOLEAN_ERROR).required(message);

type NumericStringOptions = {
  minLength?: number;
  maxLength?: number;
};

const numericString = (options?: NumericStringOptions) => {
  let schema = yup
    .string()
    .transform(sanitizeString)
    .test("numeric-only", "El campo debe contener solo caracteres numéricos", (value) => {
      if (value == null || value === "") return true;
      return /^[0-9]+$/.test(value);
    });

  if (options?.minLength != null) {
    schema = schema.min(options.minLength, `El campo debe tener al menos ${options.minLength} caracteres`);
  }
  if (options?.maxLength != null) {
    schema = schema.max(options.maxLength, `La longitud máxima permitida es de ${options.maxLength} caracteres`);
  }
  return schema;
};

export const numericStringRequired = (options?: NumericStringOptions) =>
  numericString(options).required(DEFAULT_REQUIRED_MESSAGE);

export const numericStringNullable = (options?: NumericStringOptions) =>
  numericString(options).nullable().default(null);

export const stringNullable = () => yup.string().transform(sanitizeString).nullable().default(null);

export const positiveNumberNullable = () =>
  yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .typeError(DEFAULT_TYPE_NUMBER_ERROR)
    .min(0, DEFAULT_POSITIVE_NUMBER_ERROR)
    .nullable()
    .default(null);

export const positiveNumberRequired = (message = DEFAULT_REQUIRED_MESSAGE) =>
  yup.number().typeError(DEFAULT_TYPE_NUMBER_ERROR).positive(DEFAULT_POSITIVE_NUMBER_ERROR).required(message);

export const emailRequired = (message = DEFAULT_REQUIRED_EMAIL_ERROR) =>
  yup.string().email(DEFAULT_EMAIL_ERROR).required(message);

export const emailNullable = (message = DEFAULT_EMAIL_ERROR) =>
  yup
    .string()
    .transform(sanitizeString)
    .test("valid-email", message, (value) => {
      if (value == null || value === "") return true;
      return yup.string().email().isValidSync(value);
    })
    .nullable()
    .default(null);

export const stringNullableMatching = (pattern: RegExp, message = DEFAULT_REGEX_ERROR) =>
  yup
    .string()
    .transform(sanitizeString)
    .test("match-pattern", message, (value) => {
      if (value == null || value === "") return true;
      return pattern.test(value);
    })
    .nullable()
    .default(null);

const PERU_PHONE_REGEX = /^(?:\+51)\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;

const transformPhoneNumber = (value: unknown) => {
  if (value == null) return null;
  if (typeof value !== "string") return value;
  const trimmed = value.trim().replace(/\s+/g, "");
  if (trimmed === "") return null;
  return trimmed.startsWith("+") ? trimmed : `+51 ${trimmed}`;
};

export const phoneNullable = (message = DEFAULT_PHONE_ERROR) =>
  yup
    .string()
    .transform(transformPhoneNumber)
    .test("valid-phone", message, (value) => {
      if (value == null || value === "") return true;
      return PERU_PHONE_REGEX.test(value);
    })
    .nullable()
    .default(null);

export const phoneRequired = (message = DEFAULT_PHONE_ERROR) =>
  yup
    .string()
    .transform(transformPhoneNumber)
    .test("valid-phone", message, (value) => {
      if (value == null || value === "") return true;
      return PERU_PHONE_REGEX.test(value);
    })
    .required(DEFAULT_REQUIRED_MESSAGE);

export const stringRequiredMatching = (pattern: RegExp, message = DEFAULT_REGEX_ERROR) =>
  yup
    .string()
    .transform(sanitizeString)
    .trim()
    .test("match-pattern", message, (value) => {
      if (value == null || value === "") return true;
      return pattern.test(value);
    })
    .required(DEFAULT_REQUIRED_MESSAGE);
