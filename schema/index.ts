import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})    

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
})    

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimum 6 characters required",
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    firstname: z.string().min(1, {
        message: "Firstname is required",
    }),
    lastname: z.string()
})
