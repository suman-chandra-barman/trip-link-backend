import { Router } from "express";
import { TripControllers } from "./trip.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TripValidationSchema } from "./trip.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(TripValidationSchema.createTripValidationSchema),
  TripControllers.createTrip
);

router.get("/", TripControllers.getAllTrips);

router.get("/:id", TripControllers.getSingleTrip);

router.get(
  "/my/trip-post",
  auth(UserRole.ADMIN, UserRole.USER),
  TripControllers.getMyTripPosts
);

router.delete("/:id", TripControllers.deleteTrip);

export const TripRouters = router;
