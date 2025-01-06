import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createDailyGoals = async (req: Request, res: Response) => {
  const {
    dailyEntryId,
    objective,
    description,
    isCompleted = false,
  } = req.body;

  try {
    const dailyGoal = await prisma.dailyEntryObjectives.create({
      data: {
        dailyEntryId,
        objective,
        description,
        isCompleted,
      },
    });
    res.status(201).json(dailyGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create daily goal" });
  }
};

export const getDailyGoals = async (req: Request, res: Response) => {
  const { dailyEntryId } = req.params;

  try {
    const dailyGoals = await prisma.dailyEntryObjectives.findMany({
      where: { dailyEntryId },
    });
    res.status(200).json(dailyGoals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily goals" });
  }
};

export const updateDailyGoals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  try {
    const dailyGoal = await prisma.dailyEntryObjectives.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(200).json(dailyGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update daily goal" });
  }
};

export const deleteDailyGoals = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.dailyEntryObjectives.delete({
      where: { id },
    });
    res.status(200).json({ message: "Daily goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete daily goal" });
  }
};
