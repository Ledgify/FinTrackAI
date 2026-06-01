import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

vi.mock("../lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

import { prisma } from "../lib/prisma";
import { authService } from "../services/auth.service";

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("register — creates user and returns it", async () => {
    const mockUser = { id: 1, email: "test@test.com", username: "test", fullName: "Test" };
    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const result = await authService.register({
      email: "test@test.com",
      username: "test",
      password: "123456",
      fullName: "Test",
    });

    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@test.com" } });
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("register — returns null if email exists", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({ id: 1 });

    const result = await authService.register({
      email: "exists@test.com",
      username: "test",
      password: "123456",
      fullName: "",
    });

    expect(result).toBeNull();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("login — returns user on valid credentials", async () => {
    const hashed = await bcrypt.hash("pass123", 10);
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 1,
      email: "a@b.com",
      password: hashed,
    });

    const user = await authService.login("a@b.com", "pass123");
    expect(user).not.toBeNull();
    expect(user!.id).toBe(1);
  });

  it("login — returns null on wrong password", async () => {
    const hashed = await bcrypt.hash("correct", 10);
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 1,
      email: "a@b.com",
      password: hashed,
    });

    const user = await authService.login("a@b.com", "wrong");
    expect(user).toBeNull();
  });
});
