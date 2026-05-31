import { Router, Response } from "express";
import { prisma } from "../index";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();
router.use(authMiddleware);

/**
 * @openapi
 * /api/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: List all transactions for current user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema: { type: integer }
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         schema: { type: integer }
 *         description: Year (e.g. 2026)
 *     responses:
 *       200:
 *         description: Array of transactions
 */
router.get("/", async (req: AuthRequest, res: Response) => {
  const { month, year } = req.query;
  const where: any = { userId: req.userId };
  if (month && year) {
    const m = parseInt(month as string);
    const y = parseInt(year as string);
    where.date = {
      gte: new Date(y, m - 1, 1),
      lt: new Date(y, m, 1),
    };
  }
  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
  });
  res.json(transactions);
});

/**
 * @openapi
 * /api/transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transaction by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Transaction object
 *       404:
 *         description: Not found
 */
router.get("/:id", async (req: AuthRequest, res: Response) => {
  const id = parseInt(String(req.params.id));
  const tx = await prisma.transaction.findFirst({
    where: { id, userId: req.userId },
  });
  if (!tx) {
    res.status(404).json({ detail: "Transaction not found" });
    return;
  }
  res.json(tx);
});

/**
 * @openapi
 * /api/transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Create a transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, amount, category, date]
 *             properties:
 *               type:        { type: string, enum: [income, expense] }
 *               amount:      { type: number }
 *               category:    { type: string }
 *               description: { type: string }
 *               date:        { type: string, format: date }
 *     responses:
 *       201:
 *         description: Created transaction
 */
router.post("/", async (req: AuthRequest, res: Response) => {
  const { type, amount, category, description, date } = req.body;
  const tx = await prisma.transaction.create({
    data: {
      userId: req.userId!,
      type,
      amount: parseFloat(amount),
      category,
      description: description || "",
      date: new Date(date),
    },
  });
  res.status(201).json(tx);
});

/**
 * @openapi
 * /api/transactions/{id}:
 *   put:
 *     tags: [Transactions]
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:        { type: string, enum: [income, expense] }
 *               amount:      { type: number }
 *               category:    { type: string }
 *               description: { type: string }
 *               date:        { type: string, format: date }
 *     responses:
 *       200:
 *         description: Updated transaction
 *       404:
 *         description: Not found
 */
router.put("/:id", async (req: AuthRequest, res: Response) => {
  const id = parseInt(String(req.params.id));
  const existing = await prisma.transaction.findFirst({
    where: { id, userId: req.userId },
  });
  if (!existing) {
    res.status(404).json({ detail: "Transaction not found" });
    return;
  }
  const { type, amount, category, description, date } = req.body;
  const tx = await prisma.transaction.update({
    where: { id },
    data: {
      ...(type !== undefined && { type }),
      ...(amount !== undefined && { amount: parseFloat(amount) }),
      ...(category !== undefined && { category }),
      ...(description !== undefined && { description }),
      ...(date !== undefined && { date: new Date(date) }),
    },
  });
  res.json(tx);
});

/**
 * @openapi
 * /api/transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  const id = parseInt(String(req.params.id));
  const existing = await prisma.transaction.findFirst({
    where: { id, userId: req.userId },
  });
  if (!existing) {
    res.status(404).json({ detail: "Transaction not found" });
    return;
  }
  await prisma.transaction.delete({ where: { id } });
  res.status(204).send();
});

export default router;
