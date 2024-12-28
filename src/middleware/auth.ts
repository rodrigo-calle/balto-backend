// is authenticated middleware
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // verify bearer token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.headers.authorization.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.headers.authorization.split(" ").length !== 2) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && "id" in decoded) {
      Object.assign(req, { userId: decoded?.id });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
