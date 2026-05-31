import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../index";
import { generateToken } from "../middleware/auth";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, username, password]
 *             properties:
 *               email:     { type: string, format: email }
 *               username:  { type: string }
 *               password:  { type: string, minLength: 6 }
 *               fullName:  { type: string }
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token: { type: string }
 *                 token_type:   { type: string, example: bearer }
 *       400:
 *         description: Email already registered
 */
router.post("/register", async (req: Request, res: Response) => {
  const { email, username, password, fullName } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(400).json({ detail: "Email already registered" });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, password: hashed, fullName: fullName || "" },
  });
  const token = generateToken(user.id);
  res.json({ access_token: token, token_type: "bearer" });
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token: { type: string }
 *                 token_type:   { type: string, example: bearer }
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ detail: "Invalid email or password" });
    return;
  }
  const token = generateToken(user.id);
  res.json({ access_token: token, token_type: "bearer" });
});

export default router;
