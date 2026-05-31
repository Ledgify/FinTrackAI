import { prisma } from "../lib/prisma";

export const userService = {
  getById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true, fullName: true, createdAt: true },
    });
  },

  update(id: number, data: { fullName?: string; username?: string }) {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, username: true, fullName: true, createdAt: true },
    });
  },
};
