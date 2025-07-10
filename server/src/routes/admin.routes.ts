import { Router } from "express";
import { protectRoutes } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import {
  getAllUser,
  deleteUser,
  updateUserRole,
  searchUser,
  getAnalyticsData,
} from "../controllers/admin.controller";

const router = Router();

router.get("/search-user", protectRoutes, isAdmin, searchUser);
router.get("/users", protectRoutes, isAdmin, getAllUser);
router.delete("/users/:email", protectRoutes, isAdmin, deleteUser);
router.patch("/users/role/:email", protectRoutes, isAdmin, updateUserRole);
router.get("/analytics", protectRoutes, isAdmin, getAnalyticsData);

export default router;
