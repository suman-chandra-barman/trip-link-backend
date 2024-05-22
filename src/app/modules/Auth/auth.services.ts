import { TLoginData } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import prisma from "../../../shared/prisma";

const login = async (payload: TLoginData) => {
  // check is user exists
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("Invalid Email or Password!");
  }

  // check password is match
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid Email or Password!");
  }

  // generate jwt token
  const jwtPayload = {
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(jwtPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};

export const AuthServices = {
  login,
};
