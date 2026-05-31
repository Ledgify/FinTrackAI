import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthRequest extends Request {
  userId?: number;
}

export function generateToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, SECRET, { expiresIn: "7d" });
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ detail: "Missing token" });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET) as { sub: string };
    req.userId = Number(payload.sub);
    next();
  } catch {
    res.status(401).json({ detail: "Invalid token" });
  }
}
