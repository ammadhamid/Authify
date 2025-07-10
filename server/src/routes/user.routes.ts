import { Router } from "express";
import {
  registerUser,
  loginUser,
  forgetPassword,
} from "../controllers/user.controller";
import { protectRoutes } from "../middlewares/auth.middleware";
import { verifyOTP } from "../controllers/verifyOTP.controller";
import { verifyForgotPassword } from "../controllers/verifyForgetPass.controller";
import { resetPass } from "../controllers/resetPass.controller";
import { limiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/signup", limiter, registerUser);
router.post("/verify-signup", verifyOTP);
router.post("/login", limiter, loginUser);
router.post("/auth/forgot-password", limiter, forgetPassword);
router.post("/auth/verify-forgot-password", verifyForgotPassword);
// protectedRoute for resetPassword
router.post("/auth/reset-password", protectRoutes, resetPass);

// Checking that middlware is working or not
// router.get("/me", protectRoutes, (req, res) => {
//   try {
//     res.status(200).json({
//       message: "You are Authorized You have Token You are welcomed",
//       user: req.user,
//     });
//   } catch (error) {
//     res.status(401).json({
//       message: "You are Not Authorized get the token first!!",
//     });
//   }
// });

export default router;
