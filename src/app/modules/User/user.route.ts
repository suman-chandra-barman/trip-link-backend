import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/create",
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createUser
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getAllUsers
);
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.USER),
  UserControllers.getUserProfile
);

router.put(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(UserValidationSchema.updateUserProfileValidationSchema),
  UserControllers.updateUserProfile
);

export const UserRouters = router;
