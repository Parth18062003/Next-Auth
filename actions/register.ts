"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log("values", values);
    const validated = RegisterSchema.safeParse(values);
    if (!validated.success) {
        return { error: "Registration failed!" };
    }

    const { email, password, firstname, lastname } = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    const name = `${firstname} ${lastname}`;

    if (existingUser) {
        return { error: "User already exists!" }
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation Email sent!" }
}