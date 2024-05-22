import { z } from "zod";

const createTripValidationSchema = z.object({
  body: z.object({
    destination: z.string({ required_error: "Destination  is required" }),
    startDate: z.string({ required_error: "Start Date  is required" }),
    endDate: z.string({ required_error: "End Date  is required" }),
    description: z.string({ required_error: "Description  is required" }),
    travelType: z.string({ required_error: "Travel Type  is required" }),
    photos: z.array(z.string()),
    budget: z.number({ required_error: "Budget  is required" }),
    activities: z.array(z.string()),
  }),
});

export const TripValidationSchema = {
  createTripValidationSchema,
};
