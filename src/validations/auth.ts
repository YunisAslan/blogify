import { z } from "zod";

export const registerUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username required!")
    .min(3, "Username must be at least 3 character!")
    .max(256, "Username must be at most 256 character!"),
  fullName: z
    .string()
    .trim()
    .min(1, "Full name required!")
    .min(3, "Full name must be at least 3 character!")
    .max(256, "Full name must be at most 256 character!"),
  email: z.string().trim().min(1, "Email required!").email("Email is invalid!"),
  password: z
    .string()
    .trim()
    .min(1, "Password required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
      "Password must be at least 5 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number."
    ),
  profileImg: z.string().url("Invalid url"),
});

export const registerPublisherSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username required!")
    .min(3, "Username must be at least 3 character!")
    .max(256, "Username must be at most 256 character!"),
  email: z.string().trim().min(1, "Email required!").email("Email is invalid!"),
  password: z
    .string()
    .trim()
    .min(1, "Password required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
      "Password must be at least 5 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number."
    ),
  backgroundImg: z.string().optional(),
  profileImg: z.string().url("Invalid url"),
  name: z.string().optional(),
  description: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username required!"),
  email: z.string().trim().min(1, "Email required!"),
  password: z.string().trim().min(1, "Password required!"),
});
