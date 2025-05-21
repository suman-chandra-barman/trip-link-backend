import { z } from "zod";

const itinerarySchema = z.object({
  day: z.number({ required_error: "Day  is required" }),
  description: z.string({ required_error: "Description  is required" }),
});

const createTripValidationSchema = z.object({
  body: z.object({
    destination: z.string({ required_error: "Destination  is required" }),
    startDate: z.string({ required_error: "Start Date  is required" }),
    endDate: z.string({ required_error: "End Date  is required" }),
    description: z.string({ required_error: "Description  is required" }),
    travelType: z.string({ required_error: "Travel Type  is required" }),
    photos: z.array(z.string()),
    budget: z.number({ required_error: "Budget  is required" }),
    itinerary: z.array(itinerarySchema),
  }),
});

const updateTripValidationSchema = z.object({
  body: z.object({
    destination: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    travelType: z.string().optional(),
    photos: z.array(z.string()).optional(),
    budget: z.number().optional(),
    itinerary: z.array(itinerarySchema).optional(),
  }),
});

export const TripValidationSchema = {
  createTripValidationSchema,
  updateTripValidationSchema,
};
