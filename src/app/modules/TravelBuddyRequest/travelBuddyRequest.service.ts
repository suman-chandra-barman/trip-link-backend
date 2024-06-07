import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { BuddyRequestStatus } from "@prisma/client";
import { TAuthUser } from "../../interface/common";

const sendTravelBuddyRequest = async (payload: {
  userId: string;
  tripId: string;
}) => {
  //check trip is exists
  const isTripExists = await prisma.trip.findUnique({
    where: {
      id: payload.tripId,
    },
  });
  if (!isTripExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Trip not found");
  }

  //check trip is exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //check is user already send request
  const isAlreadySend = await prisma.travelBuddyRequest.findFirst({
    where: {
      tripId: payload.tripId,
      userId: payload.userId,
    },
  });
  if (isAlreadySend) {
    throw new AppError(httpStatus.BAD_REQUEST, "Request Already Send");
  }

  //create travel buddy request into db
  const result = await prisma.travelBuddyRequest.create({
    data: {
      tripId: payload.tripId,
      userId: payload.userId,
      status: "PENDING",
    },
  });
  return result;
};

const getPotentialTravelBuddies = async (tripId: string) => {
  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return result;
};

const respondTravelBuddyRequest = async (
  buddyId: string,
  payload: { tripId: string; status: BuddyRequestStatus }
) => {
  //check travel buddy request is exists
  const isTravelBuddyRequestExists = await prisma.travelBuddyRequest.findUnique(
    {
      where: {
        id: buddyId,
        tripId: payload.tripId,
      },
    }
  );
  if (!isTravelBuddyRequestExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Travel buddy request not found");
  }

  // update travel buddy request status
  const result = await prisma.travelBuddyRequest.update({
    where: {
      id: buddyId,
      tripId: payload.tripId,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

const getUserTravelRequests = async (user: TAuthUser) => {
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      userId: user?.id,
    },
  });

  return result;
};

export const TravelBuddyRequestServices = {
  sendTravelBuddyRequest,
  getPotentialTravelBuddies,
  respondTravelBuddyRequest,
  getUserTravelRequests,
};
