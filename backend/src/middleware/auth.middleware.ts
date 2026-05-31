import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express.d";
import { env } from "../config/env";

export function generateToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, env.JWT_SECRET, { expiresIn: "7d" });
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ detail: "Missing token" });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as { sub: string };
    req.userId = Number(payload.sub);
    next();
  } catch {
    res.status(401).json({ detail: "Invalid token" });
  }
}
