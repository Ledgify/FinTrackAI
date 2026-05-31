import { Response } from "express";
import { AuthRequest } from "../types/express.d";
import { userService } from "../services/user.service";

export const userController = {
  async getProfile(req: AuthRequest, res: Response) {
    const user = await userService.getById(req.userId!);
    if (!user) {
      res.status(404).json({ detail: "User not found" });
      return;
    }
    res.json(user);
  },

  async updateProfile(req: AuthRequest, res: Response) {
    const user = await userService.update(req.userId!, req.body);
    res.json(user);
  },
};
