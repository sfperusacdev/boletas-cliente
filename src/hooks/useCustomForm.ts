import { useForm, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCustomForm<TSchema extends yup.ObjectSchema<any>>(
  schema: TSchema,
  props?: {
    defaultValues?:
      | DefaultValues<yup.InferType<TSchema>>
      | (() => Promise<DefaultValues<yup.InferType<TSchema>>>);
  },
) {
  const form = useForm<yup.InferType<TSchema>>({
    resolver: yupResolver(schema),
    defaultValues: props?.defaultValues,
  });

  const wrappedHandleSubmit: typeof form.handleSubmit = (
    onValid,
    onInvalid,
  ) => {
    return form.handleSubmit(onValid, errors => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.error("Validation Errors:", errors);
      }
      if (onInvalid) {
        onInvalid(errors);
      }
    });
  };

  return { ...form, handleSubmit: wrappedHandleSubmit };
}
