import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};
