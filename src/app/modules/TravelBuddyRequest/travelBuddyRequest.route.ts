import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TravelDuddyRequestValidationSchema } from "./travelBuddyRequest.validation";
import { TravelBuddyRequestControllers } from "./travelBuddyRequest.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/:tripId/request",
  auth(),
  validateRequest(
    TravelDuddyRequestValidationSchema.createTravelDuddyRequestValidationSchema
  ),
  TravelBuddyRequestControllers.sendTravelBuddyRequest
);

router.get(
  "/:tripId",
  auth(),
  TravelBuddyRequestControllers.getPotentialTravelBuddies
);

router.put(
  "/:buddyId/respond",
  auth(),
  validateRequest(
    TravelDuddyRequestValidationSchema.responseTravelDuddyRequestValidationSchema
  ),
  TravelBuddyRequestControllers.respondTravelBuddyRequest
);

export const TravelBuddyRequestRouters = router;
