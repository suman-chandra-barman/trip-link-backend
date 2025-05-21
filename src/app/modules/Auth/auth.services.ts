import { TLoginData } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const login = async (payload: TLoginData) => {
  // check is user exists
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: payload.usernameOrEmail },
        { email: payload.usernameOrEmail },
      ],
    },
  });
  if (!user) {
    throw new Error("Invalid Email or UserName!");
  }

  // check password is match
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid Password!");
  }

  // generate jwt token
  const jwtPayload = {
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  };
};

const changePassword = async (
  userInfo: TAuthUser,
  payload: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  // get user into DB
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: userInfo?.email,
      status: "ACTIVE",
      isDeleted: false,
    },
  });

  // check given old password match with user password
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.currentPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!");
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRounds)
  );

  // update password in DB
  const result = await prisma.user.update({
    where: {
      email: userData.email,
      status: "ACTIVE",
    },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  return result;
};

export const AuthServices = {
  login,
  changePassword,
};
