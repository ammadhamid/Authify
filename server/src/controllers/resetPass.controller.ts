import { Request, Response } from "express";
import userModel from "../models/user.model";

export const resetPass = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;
    const { newPass } = req.body;

    if (!newPass || !email) {
      return res.status(401).json({
        message: "Password and Email is required",
      });
    }

    if (newPass.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }
    user.password = newPass;
    await user.save();

    res.status(201).json({
      message: "Password changed Succesfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while resetting password." });
  }
};
