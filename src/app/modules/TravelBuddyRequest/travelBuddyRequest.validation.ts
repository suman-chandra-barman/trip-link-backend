import { BuddyRequestStatus } from "@prisma/client";
import { z } from "zod";

const createTravelDuddyRequestValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "User ID  is required" }),
    tripId: z.string({ required_error: "Trip ID  is required" }),
  }),
});
const responseTravelDuddyRequestValidationSchema = z.object({
  body: z.object({
    tripId: z.string({ required_error: "Trip ID  is required" }),
    status: z.enum([BuddyRequestStatus.APPROVED, BuddyRequestStatus.REJECTED]),
  }),
});

export const TravelDuddyRequestValidationSchema = {
  createTravelDuddyRequestValidationSchema,
  responseTravelDuddyRequestValidationSchema,
};
