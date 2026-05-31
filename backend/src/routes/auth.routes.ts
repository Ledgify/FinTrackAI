import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

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
 *       400:
 *         description: Email already registered
 */
router.post("/register", validate(registerSchema), authController.register);

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
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", validate(loginSchema), authController.login);

export default router;
