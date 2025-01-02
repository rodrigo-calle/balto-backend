import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createDailyEntry = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { weekId, date, progress, notes } = req.body;

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
    const entry = await prisma.dailyEntry.create({
      data: {
        weekId,
        date: new Date(date),
        progress,
        notes,
      },
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to create daily entry" });
  }
};

export const getEntriesByWeek = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { weekId } = req.params;

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
    const entries = await prisma.dailyEntry.findMany({
      where: { weekId },
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily entries" });
  }
};

export const updateDailyEntry = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { date, progress, notes } = req.body;

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
    const entry = await prisma.dailyEntry.update({
      where: { id },
      data: {
        date: new Date(date),
        progress,
        notes,
      },
    });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update daily entry" });
  }
};

export const deleteDailyEntry = async (
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
    await prisma.dailyEntry.delete({
      where: { id },
    });
    res.status(200).json({ message: "Daily entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete daily entry" });
  }
};
