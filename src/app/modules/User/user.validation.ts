import { Gender } from "@prisma/client";
import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(30, {
        message: "Username must be less than or equal to 30 characters long",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    profile: z.object({
      contactNumber: z.string({
        required_error: "Contact Number is required",
      }),
      gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
        required_error: "Gender is required",
      }),
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    role: z.enum(["ADMIN", "USER"]).optional(),
    status: z.enum(["ACTIVE", "DEACTIVE"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateUserProfileValidationSchema,
};
