import { Router, Request, Response } from "express";
import { generateToken } from "../middleware/auth";

const router = Router();

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  fullName: string;
}

const users: User[] = [];

router.post("/register", (req: Request, res: Response) => {
  const { email, username, password, fullName } = req.body;
  if (users.find((u) => u.email === email)) {
    res.status(400).json({ detail: "Email already registered" });
    return;
  }
  const user: User = {
    id: users.length + 1,
    email,
    username,
    password,
    fullName: fullName || "",
  };
  users.push(user);
  const token = generateToken(user.id);
  res.json({ access_token: token, token_type: "bearer" });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    res.status(401).json({ detail: "Invalid email or password" });
    return;
  }
  const token = generateToken(user.id);
  res.json({ access_token: token, token_type: "bearer" });
});

export default router;
