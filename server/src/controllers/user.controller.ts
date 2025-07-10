import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
import {
  generateAndSendSignUpEmail,
  generateAndSendResetEmail,
} from "../helpers/generateOTPandSendEmail";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    if ([name, email, role, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exist" });
    }

    const user = new User({ name, email, role, password });
    await user.save();

    // if (!process.env.JWT_SECRET) {
    //   throw new Error("JWT_SECRET environment variable is not defined");
    // }
    // const token = jwt.sign(
    //   { userId: user._id, email: user.email },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "24h" }
    // );
    await generateAndSendSignUpEmail(email);

    return res.status(201).json({
      message: "User Registered Successfully",
      // token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error: ",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const passMatches = await user?.comparePass(password);

    if (!passMatches) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET envoirnment variable is not deifned");
    }

    const token = jwt.sign(
      {
        userID: user?._id,
        email: user?.email,
        role: user?.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Access Denied",
      });
    }

    return res.status(201).json({
      message: "User login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error: ",
      error,
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      message: "Email Not Found",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }

  await generateAndSendResetEmail(email);
  res.status(201).json({
    message: "Reset Email Send Succesfully ",
  });
};
