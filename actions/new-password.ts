"use server"

import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordRestTokenByToken } from "@/data/passwordreset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Token is required" };
    }

    const validated = NewPasswordSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Invalid Credentials!" };
    }
    
    const { password } = validated.data;

    const existingToken = await getPasswordRestTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid Token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    await db.user.update({
        where: { id: existingUser.id, },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Password has been reset" };
}