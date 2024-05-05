"use server"

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log("values", values);
    const validated = LoginSchema.safeParse(values);
    if (!validated.success) {
        return { error: "Invalid Credential!" };
    }

    return { success: "Login successfull!" }
}
