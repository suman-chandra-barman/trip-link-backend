import { Router } from "express";
import { TripControllers } from "./trip.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TripValidationSchema } from "./trip.validation";

const router = Router();

router.post(
  "/",
  validateRequest(TripValidationSchema.createTripValidationSchema),
  TripControllers.createTrip
);

router.get("/", TripControllers.getAllTrips);

export const TripRouters = router;
