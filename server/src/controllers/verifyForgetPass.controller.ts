import { Request, Response } from "express";
import otpModel from "../models/otp.model";
import jwt from "jsonwebtoken";

export const verifyForgotPassword = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }

  const otpRecord = await otpModel.findOne({ email });

  if (!otpRecord) {
    return res.status(401).json({
      message: "OTP Not Found",
    });
  }

  const isExpired = otpRecord.expiresAt.getTime() < Date.now();
  if (isExpired) {
    return res.status(401).json({
      message: "OTP has expired",
    });
  }

  const isMatch = await otpRecord.compareOTP(otp);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid OTP",
    });
  }
  await otpRecord.deleteOne();

  if (!process.env.JWT_SECRET) {
    return res.status(401).json({
      message: "JWT_SECRET NOT FOUND",
    });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.status(201).json({
    message: "OTP Verified. You may now reset your password.",
    token,
  });
};
