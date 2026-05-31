import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(30),
  password: z.string().min(6),
  fullName: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userUpdateSchema = z.object({
  fullName: z.string().optional(),
  username: z.string().min(2).max(30).optional(),
});
