import { Router } from "express";
import { UserRouters } from "../modules/User/user.route";
import { AuthRouters } from "../modules/Auth/auth.route";
import { TripRouters } from "../modules/Trip/trip.route";
import { TravelBuddyRequestRouters } from "../modules/TravelBuddyRequest/travelBuddyRequest.route";

const router = Router();

router.use("/register", UserRouters);
router.use("/profile", UserRouters);
router.use("/login", AuthRouters);
router.use("/trips", TripRouters);
router.use("/trip", TravelBuddyRequestRouters);
router.use("/travel-buddies", TravelBuddyRequestRouters);

export const Routes = router;
