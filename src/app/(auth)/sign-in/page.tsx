/*
 *   Copyright (c) 2026 Massimiliano Porzio
 *   All rights reserved.
 */
"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validation";
import { FieldValues } from "react-hook-form";
import { success } from "zod";
import { ZodType } from "zod/v3";

const SignIn = () => {
  return (
    <div>
      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  );
};

export default SignIn;
