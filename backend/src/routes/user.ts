import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

interface Profile {
  id: number;
  email: string;
  username: string;
  fullName: string;
}

const profiles: Record<number, Profile> = {};

router.get("/profile", (req: AuthRequest, res: Response) => {
  const profile = profiles[req.userId!];
  if (!profile) {
    res.status(404).json({ detail: "Profile not found" });
    return;
  }
  res.json(profile);
});

router.put("/profile", (req: AuthRequest, res: Response) => {
  const { fullName, username } = req.body;
  const profile = profiles[req.userId!];
  if (profile) {
    if (fullName !== undefined) profile.fullName = fullName;
    if (username !== undefined) profile.username = username;
  }
  res.json(profile);
});

export default router;
