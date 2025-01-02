import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { addMonths, addWeeks } from "date-fns";

export const createGoal = async (req: Request, res: Response): Promise<any> => {
  const {
    title,
    description,
    startDate = new Date(),
    endDate = addMonths(new Date(), 3),
  } = req.body;
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
    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        User: { connect: { id: user.id } },
      },
    });

    if (!goal) {
      return res.status(500).json({ error: "Failed to create goal" });
    }

    const weeks: {
      goalId: string;
      weekNumber: number;
      description: string;
      startDate: Date;
      endDate: Date;
      userId: string;
    }[] = [];

    for (let i = 1; i <= 12; i++) {
      const week = {
        goalId: goal.id,
        weekNumber: i,
        description: `Week ${i}`,
        startDate: addWeeks(startDate, i - 1),
        endDate: addWeeks(startDate, i),
        userId: user.id,
      };

      if (i === 1) {
        week.startDate = startDate;
      }

      weeks.push(week);
    }

    await prisma.week.createMany({
      data: weeks,
    });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

export const getGoals = async (req: Request, res: Response): Promise<any> => {
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

    const goals = await prisma.goal.findMany({
      where: { userId: req.userId },
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

export const getGoal = async (req: Request, res: Response): Promise<any> => {
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
    const goal = await prisma.goal.findUnique({
      where: { id: req.params.id, userId: req.userId },
      include: {
        weeks: {
          select: {
            WeeklyObjectives: true,
            endDate: true,
            weekNumber: true,
            description: true,
            startDate: true,
            DailyEntry: true,
            id: true,
            goalId: true,
          },
        },
      },
    });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch goal" });
  }
};
