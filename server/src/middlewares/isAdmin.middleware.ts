import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({
        message: "Access Denied: Admins only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
