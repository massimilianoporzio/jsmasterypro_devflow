/*
 *   Copyright (c) 2026 Massimiliano Porzio
 *   All rights reserved.
 */
"use client";
import * as z from "zod";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(50, "Username must be at most 50 characters long"),
});

const AuthForm = <T extends FieldValues>({ schema, defaultValues, onSubmit, formType }: AuthFormProps<T>) => {
  const form = useForm<T>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-8">
      <FieldGroup>
        {Object.keys(defaultValues).map((fieldName) => (
          <Controller
            key={fieldName}
            name={fieldName as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor={`form-rhf-input-${fieldName}`} className="paragraph-medium text-dark400_light700">
                  {fieldName === "email" ? "Email Address" : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  id={`form-rhf-input-${fieldName}`}
                  aria-invalid={fieldState.invalid}
                  placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  autoComplete={fieldName}
                  type={fieldName === "password" ? "password" : "text"}
                  className="rounded-2"
                  required
                />
                <FieldDescription />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}

        <Button
          type="submit"
          className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signing In..." : "Signing Up...") : buttonText}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default AuthForm;
