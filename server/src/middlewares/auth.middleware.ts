import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized Access: No Token",
      });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access: Invalid Token",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT SECRET NOT FOUND");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    req.user = decoded;

    next(); // access dedo protected hai ab ye token hai to user hi hai ye
  } catch (error) {
    return res
      .status(401)
      .json({ message: "unauthorized Access : Invalid Token" });
  }
};
