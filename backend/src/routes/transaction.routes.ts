import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction.schema";

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
 *       - in: query
 *         name: year
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Array of transactions
 */
router.get("/", transactionController.list);

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
router.post("/", validate(createTransactionSchema), transactionController.create);

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
router.get("/:id", transactionController.getById);

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
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", validate(updateTransactionSchema), transactionController.update);

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
router.delete("/:id", transactionController.delete);

export default router;
