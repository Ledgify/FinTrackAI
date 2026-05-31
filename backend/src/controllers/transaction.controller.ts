import { Response } from "express";
import { AuthRequest } from "../types/express.d";
import { transactionService } from "../services/transaction.service";

export const transactionController = {
  async list(req: AuthRequest, res: Response) {
    const { month, year } = req.query;
    const transactions = await transactionService.list(
      req.userId!,
      month ? parseInt(month as string) : undefined,
      year ? parseInt(year as string) : undefined,
    );
    res.json(transactions);
  },

  async getById(req: AuthRequest, res: Response) {
    const tx = await transactionService.getById(req.userId!, parseInt(String(req.params.id)));
    if (!tx) {
      res.status(404).json({ detail: "Transaction not found" });
      return;
    }
    res.json(tx);
  },

  async create(req: AuthRequest, res: Response) {
    const tx = await transactionService.create(req.userId!, {
      ...req.body,
      date: new Date(req.body.date),
    });
    res.status(201).json(tx);
  },

  async update(req: AuthRequest, res: Response) {
    const id = parseInt(String(req.params.id));
    const existing = await transactionService.getById(req.userId!, id);
    if (!existing) {
      res.status(404).json({ detail: "Transaction not found" });
      return;
    }
    const data = { ...req.body };
    if (data.date) data.date = new Date(data.date);
    if (data.amount) data.amount = parseFloat(data.amount);
    const tx = await transactionService.update(req.userId!, id, data);
    res.json(tx);
  },

  async delete(req: AuthRequest, res: Response) {
    const id = parseInt(String(req.params.id));
    const existing = await transactionService.getById(req.userId!, id);
    if (!existing) {
      res.status(404).json({ detail: "Transaction not found" });
      return;
    }
    await transactionService.delete(req.userId!, id);
    res.status(204).send();
  },
};
