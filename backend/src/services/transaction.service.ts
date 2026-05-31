import { prisma } from "../lib/prisma";

export const transactionService = {
  list(userId: number, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }
    return prisma.transaction.findMany({ where, orderBy: { date: "desc" } });
  },

  getById(userId: number, id: number) {
    return prisma.transaction.findFirst({ where: { id, userId } });
  },

  create(userId: number, data: { type: string; amount: number; category: string; description: string; date: Date }) {
    return prisma.transaction.create({ data: { userId, ...data } });
  },

  update(userId: number, id: number, data: any) {
    return prisma.transaction.update({ where: { id }, data });
  },

  delete(userId: number, id: number) {
    return prisma.transaction.delete({ where: { id } });
  },
};
