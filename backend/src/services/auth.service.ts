import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

export const authService = {
  async register(data: { email: string; username: string; password: string; fullName: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) return null;
    const hashed = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: { ...data, password: hashed },
    });
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    return user;
  },
};
