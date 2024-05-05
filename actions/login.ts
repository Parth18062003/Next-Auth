"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid Credential!" };
  }

  const { email, password } = validated.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credential!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
