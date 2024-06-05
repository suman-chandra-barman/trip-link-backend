import bcrypt from "bcrypt";
import config from "../../../config";
import { TUserCreateData } from "./user.interface";
import prisma from "../../../shared/prisma";

const createUserIntoDB = async (payload: TUserCreateData) => {
  //hashed password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.saltRounds)
  );

  const userData = {
    username: payload.username,
    email: payload.email,
    password: hashedPassword,
  };

  // create user and user profile
  const result = await prisma.$transaction(async (tx) => {
    //create user into db
    const createdUser = await tx.user.create({
      data: userData,

      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    //create user profile into db
    await tx.userProfile.create({
      data: {
        userId: createdUser.id,
        contactNumber: payload.profile.contactNumber,
        gender: payload.profile.gender,
      },
    });

    return createdUser;
  });

  return result;
};
const getUserProfileFromDB = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      userProfile: true,
    },
  });
  return result;
};
const updateUserProfileIntoDB = async (
  id: string,
  payload: { username?: string; email?: string }
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getUserProfileFromDB,
  updateUserProfileIntoDB,
};
