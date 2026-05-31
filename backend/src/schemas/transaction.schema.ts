import { z } from "zod";

export const createTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  category: z.string().min(1),
  description: z.string().optional().default(""),
  date: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date"),
});

export const updateTransactionSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
  amount: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  date: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), "Invalid date")
    .optional(),
});
