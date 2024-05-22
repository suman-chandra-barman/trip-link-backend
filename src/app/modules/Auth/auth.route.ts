import { Router } from "express";
import { AuthValidationSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
const router = Router();

router.post(
  "/",
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.login
);

export const AuthRouters = router;
