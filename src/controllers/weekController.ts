import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createWeek = async (req: Request, res: Response) => {
  const { goalId, weekNumber, description, endDate, startDate } = req.body;

  try {
    const week = await prisma.week.create({
      data: {
        goalId,
        weekNumber,
        description,
        endDate: new Date(endDate),
        startDate: new Date(startDate),
      },
    });
    res.status(201).json(week);
  } catch (error) {
    res.status(500).json({ error: "Failed to create week" });
  }
};

export const getWeeksByGoal = async (req: Request, res: Response) => {
  const { goalId } = req.params;

  try {
    const weeks = await prisma.week.findMany({
      where: { goalId },
    });
    res.status(200).json(weeks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weeks" });
  }
};

export const updateWeek = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { weekNumber, objectives } = req.body;

  const dataToUpdate: {
    weekNumber?: number;
    objectives?: string;
  } = {};

  if (weekNumber) {
    dataToUpdate["weekNumber"] = weekNumber;
  }
  if (objectives) {
    dataToUpdate["objectives"] = objectives;
  }
  try {
    const week = await prisma.week.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(200).json(week);
  } catch (error) {
    res.status(500).json({ error: "Failed to update week" });
  }
};

// Eliminar una semana
export const deleteWeek = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.week.delete({
      where: { id },
    });
    res.status(200).json({ message: "Week deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete week" });
  }
};
