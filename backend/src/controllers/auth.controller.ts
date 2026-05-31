import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { generateToken } from "../middleware/auth.middleware";

export const authController = {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    if (!user) {
      res.status(400).json({ detail: "Email already registered" });
      return;
    }
    const token = generateToken(user.id);
    res.json({ access_token: token, token_type: "bearer" });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) {
      res.status(401).json({ detail: "Invalid email or password" });
      return;
    }
    const token = generateToken(user.id);
    res.json({ access_token: token, token_type: "bearer" });
  },
};
