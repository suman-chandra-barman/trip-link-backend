import { Router } from "express";
import { AuthValidationSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.login
);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(AuthValidationSchema.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRouters = router;
