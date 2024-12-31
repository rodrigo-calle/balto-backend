import { prisma } from "../prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: encryptedPassword, name },
    });

    const token = jwt.sign(
      { id: user.id, email, name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// TODO: type the response and add validations
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id },
      data: { password: encryptedPassword },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    const { password, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
