import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

const isClient = typeof window !== "undefined";

export const registerValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  profilePhoto: isClient
    ? z
        .instanceof(FileList)
        .nullable()
        .refine((files) => files && files.length > 0, {
          message: "Profile photo is required",
        })
        .refine((files) => files && files[0]?.type.startsWith("image/"), {
          message: "Invalid file type",
        })
    : z.any(),
});