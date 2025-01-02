import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createWeekObjective = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { weekId, objective } = req.body;
  console.log({ weekId, objective });
  try {
    if (!("userId" in req && typeof req.userId === "string")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const weekleObjective = await prisma.weeklyObjectives.create({
      data: {
        objective,
        weekId,
      },
    });
    res.status(200).json(weekleObjective);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Failed to add week objective" });
  }
};

export const updateWeekObjective = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { objective } = req.body;

  try {
    if (!("userId" in req && typeof req.userId === "string")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const weekleObjective = await prisma.weeklyObjectives.update({
      where: { id },
      data: {
        objective,
      },
    });
    res.status(200).json(weekleObjective);
  } catch (error) {
    res.status(500).json({ error: "Failed to update week objective" });
  }
};

export const removeWeekObjective = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!("userId" in req && typeof req.userId === "string")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await prisma.weeklyObjectives.delete({
      where: { id },
    });
    res.status(200).json({ message: "Week objective deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete week objective" });
  }
};
