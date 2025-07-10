import { Request, Response } from "express";
import userModel from "../models/user.model";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await userModel.find().select("-password");

    if (allUsers.length === 0) {
      return res.status(200).json({ message: "No users found || Empty DB" });
    }

    return res.status(200).json({
      message: "All User Found",
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Servor Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    if (req.user.email === email) {
      return res.status(403).json({ message: "Cannot delete own account" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    await user.deleteOne();

    return res.status(201).json({
      message: "User Deleted Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { newRole } = req.body;

    if (!email || !newRole) {
      return res.status(401).json({
        message: "Email and Role is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    if (
      req.user.role !== "admin" ||
      req.user.email !== process.env.SUPER_ADMIN_EMAIL
    ) {
      return res
        .status(403)
        .json({ message: "Only super admin can assign admin roles" });
    }

    if (!["admin", "user"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    user.role = newRole;
    await user.save();
    return res.status(200).json({
      message: "User Role is Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        message: "No Users Found",
      });
    }

    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await userModel
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { role: { $regex: query, $options: "i" } },
        ],
      })
      .select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users matched your query" });
    }

    return res.status(200).json({
      message: "Users Found Successfullu",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAnalyticsData = async (req: Request, res: Response) => {
  try {
    const allUserCount = await userModel.countDocuments({});
    const verifiedUsers = await userModel.countDocuments({ isVerified: true });
    const unverifiedUsers = await userModel.countDocuments({
      isVerified: false,
    });
    const adminCount = await userModel.countDocuments({ role: "admin" });
    const userCount = allUserCount - adminCount;
    const newUsersThisWeek = await userModel.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    return res.status(200).json({
      message: "Analytics fetched successfully",
      allUserCount,
      verifiedUsers,
      unverifiedUsers,
      adminCount,
      userCount,
      newUsersThisWeek,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
