import { Router } from "express";
import { UserRouters } from "../modules/User/user.route";
import { AuthRouters } from "../modules/Auth/auth.route";
import { TripRouters } from "../modules/Trip/trip.route";
import { TravelBuddyRequestRouters } from "../modules/TravelBuddyRequest/travelBuddyRequest.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouters,
  },

  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/trips",
    route: TripRouters,
  },
  {
    path: "/travel-buddies",
    route: TravelBuddyRequestRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const Routes = router;
