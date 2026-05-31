import { Router, Response } from "express";
import { prisma } from "../index";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:        { type: integer }
 *                 email:     { type: string }
 *                 username:  { type: string }
 *                 fullName:  { type: string }
 *                 createdAt: { type: string, format: date-time }
 */
router.get("/profile", async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, username: true, fullName: true, createdAt: true },
  });
  if (!user) {
    res.status(404).json({ detail: "User not found" });
    return;
  }
  res.json(user);
});

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               username: { type: string }
 *     responses:
 *       200:
 *         description: Updated profile
 */
router.put("/profile", async (req: AuthRequest, res: Response) => {
  const { fullName, username } = req.body;
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { ...(fullName !== undefined && { fullName }), ...(username !== undefined && { username }) },
    select: { id: true, email: true, username: true, fullName: true, createdAt: true },
  });
  res.json(user);
});

export default router;
