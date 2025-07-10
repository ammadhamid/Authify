import OTP from "../models/otp.model";
import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const otpRecord = await OTP.findOne({ email });
  if (!otpRecord) {
    return res.status(404).json({ message: "OTP not found for this email" });
  }

  const isMatch = await otpRecord.compareOTP(otp);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  if (otpRecord.expiresAt.getTime() < Date.now()) {
    await OTP.deleteOne({ email });
    return res.status(401).json({ message: "OTP has expired" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "User already verified" });
  }

  user.isVerified = true;
  await user.save();
  await OTP.deleteOne({ email });

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret not defined" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "OTP Verified Successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};
