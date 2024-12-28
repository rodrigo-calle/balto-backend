import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { addMonths } from "date-fns";

export const createGoal = async (req: Request, res: Response) => {
  const {
    title,
    description,
    startDate = new Date(),
    endDate = addMonths(new Date(), 3),
  } = req.body;
  try {
    const goal = await prisma.goal.create({
      data: { title, description, startDate, endDate },
    });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

export const getGoals = async (_: Request, res: Response) => {
  try {
    const goals = await prisma.goal.findMany();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};
