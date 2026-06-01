import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema, userUpdateSchema } from "../schemas/auth.schema";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction.schema";

describe("auth schemas", () => {
  it("registerSchema — valid data passes", () => {
    const result = registerSchema.safeParse({
      email: "a@b.com",
      username: "testuser",
      password: "123456",
      fullName: "Test User",
    });
    expect(result.success).toBe(true);
  });

  it("registerSchema — invalid email fails", () => {
    const result = registerSchema.safeParse({
      email: "notanemail",
      username: "test",
      password: "123456",
    });
    expect(result.success).toBe(false);
  });

  it("registerSchema — short password fails", () => {
    const result = registerSchema.safeParse({
      email: "a@b.com",
      username: "test",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("loginSchema — valid data passes", () => {
    const result = loginSchema.safeParse({ email: "a@b.com", password: "123456" });
    expect(result.success).toBe(true);
  });
});

describe("transaction schemas", () => {
  it("createTransactionSchema — valid expense passes", () => {
    const result = createTransactionSchema.safeParse({
      type: "expense",
      amount: 500,
      category: "Food",
      date: "2026-03-15",
    });
    expect(result.success).toBe(true);
  });

  it("createTransactionSchema — negative amount fails", () => {
    const result = createTransactionSchema.safeParse({
      type: "expense",
      amount: -100,
      category: "Food",
      date: "2026-03-15",
    });
    expect(result.success).toBe(false);
  });

  it("createTransactionSchema — invalid type fails", () => {
    const result = createTransactionSchema.safeParse({
      type: "transfer",
      amount: 100,
      category: "Food",
      date: "2026-03-15",
    });
    expect(result.success).toBe(false);
  });
});
