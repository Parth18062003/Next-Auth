"use server"

import { ResetSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"
import * as z from "zod"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validated = ResetSchema.safeParse(values)
    console.log(validated)
    if (!validated.success) {
        return { error: "Invalid email" }
    }

    const { email } = validated.data

    const user = await getUserByEmail(email)

    if (!user) {
        return { error: "User not found" }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
    return { success: "Reset Email sent" }

}