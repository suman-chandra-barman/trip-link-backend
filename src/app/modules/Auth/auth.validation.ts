import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    usernameOrEmail: z.string({
      required_error: "Username or email is required",
    }),
    password: z.string({ required_error: "Password  is required" }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Current password  is required",
    }),
    newPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
