import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createUser
);

router.get("/", auth(), UserControllers.getUserProfile);

router.put(
  "/",
  auth(),
  validateRequest(UserValidationSchema.updateUserProfileValidationSchema),
  UserControllers.updateUserProfile
);

export const UserRouters = router;
