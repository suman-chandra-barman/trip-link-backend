import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    usernameOrEmail: z.string({
      required_error: "Username or email is required",
    }),
    password: z.string({ required_error: "Password  is required" }),
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
};
