import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TravelDuddyRequestValidationSchema } from "./travelBuddyRequest.validation";
import { TravelBuddyRequestControllers } from "./travelBuddyRequest.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/request",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(
    TravelDuddyRequestValidationSchema.createTravelDuddyRequestValidationSchema
  ),
  TravelBuddyRequestControllers.sendTravelBuddyRequest
);

router.get(
  "/:tripId",
  auth(UserRole.ADMIN, UserRole.USER),
  TravelBuddyRequestControllers.getPotentialTravelBuddies
);

router.put(
  "/:buddyId/respond",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(
    TravelDuddyRequestValidationSchema.responseTravelDuddyRequestValidationSchema
  ),
  TravelBuddyRequestControllers.respondTravelBuddyRequest
);

export const TravelBuddyRequestRouters = router;
