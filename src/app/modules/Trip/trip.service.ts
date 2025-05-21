import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelpers";
import { TTrip } from "./trip.interface";
import { TAuthUser } from "../../interface/common";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createTripIntoDB = async (user: TAuthUser, payload: TTrip) => {
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  //create trip into db
  const result = await prisma.trip.create({
    data: {
      userId: user?.id,
      ...payload,
    },
  });
  return result;
};

const getAllTripsFromDB = async (query: any, paginationOptions: any) => {
  const { searchTerm, travelDate, minBudget, maxBudget, ...filterData } = query;



  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions: Prisma.TripWhereInput[] = [];

  //searching
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          destination: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          travelType: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  //filter by date
  if (travelDate) {
    andConditions.push({
      AND: [
        { startDate: { lte: travelDate } },
        { endDate: { gte: travelDate } },
      ],
    });
  }

  //filter data by field
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((field) => {
        return {
          [field]: filterData[field],
        };
      }),
    });
  }

  //filter by budget range
  if (minBudget || maxBudget) {
    //if minBudget and maxBudget exists
    if (minBudget && maxBudget) {
      andConditions.push({
        budget: {
          gte: Number(minBudget),
          lte: Number(maxBudget),
        },
      });
    }
    //if only minBudget exists
    if (minBudget) {
      andConditions.push({
        budget: {
          gte: Number(minBudget),
        },
      });
    }

    //if only maxBudget exists
    if (maxBudget) {
      andConditions.push({
        budget: {
          lte: Number(maxBudget),
        },
      });
    }
  }

  //sortBy fields filter
  let sortByField = sortBy;
  if (sortBy !== "destination" && sortBy !== "budget") {
    sortByField = "createdAt";
  }

  //Check if isDeleted false
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.TripWhereInput = { AND: andConditions };

  //get all trips
  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortByField as string]: sortOrder,
    },
    select: {
      id: true,
      destination: true,
      description: true,
      budget: true,
      travelType: true,
      photos: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
      user: true,
      itinerary: true,
      isDeleted: true,
      travelBuddyRequests: true,
    },
  });

  //get total fields
  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTripFromBD = async (id: string) => {
  const result = await prisma.trip.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Trip not found");
  }
  return result;
};

const getMyTripPosts = async (user: TAuthUser) => {
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await prisma.trip.findMany({
    where: {
      userId: user?.id,
    },
  });

  return result;
};

const updateTripIntoDB = async (id: string, payload: TTrip) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id,
    },
  });
  if (!trip) {
    throw new AppError(httpStatus.NOT_FOUND, "Trip not fund");
  }

  const result = await prisma.trip.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteTripFromDB = async (id: string) => {
  // Check if the trip exists
  const trip = await prisma.trip.findUnique({
    where: { id },
  });
  if (!trip) {
    throw new AppError(httpStatus.NOT_FOUND, "Trip not found");
  }

  // Soft delete trip
  const result = await prisma.trip.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const TrapServices = {
  createTripIntoDB,
  getAllTripsFromDB,
  getSingleTripFromBD,
  getMyTripPosts,
  deleteTripFromDB,
  updateTripIntoDB,
};
