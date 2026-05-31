import { Router, Response } from "express";
import { prisma } from "../index";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

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
