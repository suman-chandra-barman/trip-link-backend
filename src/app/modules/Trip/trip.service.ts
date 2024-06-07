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

  const d = new Date(searchTerm);

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions: Prisma.TripWhereInput[] = [];

  //if search trip by string  value
  if (searchTerm && isNaN(d.getTime())) {
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

  //if search by date
  if (searchTerm && !isNaN(d.getTime())) {
    andConditions.push({
      AND: [
        { startDate: { lte: searchTerm } },
        { endDate: { gte: searchTerm } },
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

  // filter by budget range
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

  const whereConditions: Prisma.TripWhereInput = { AND: andConditions };

  //get all trips
  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortByField as string]: sortOrder,
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

const deleteTrip = async (id: string) => {
  console.log("id", id);
  const result = await prisma.trip.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TrapServices = {
  createTripIntoDB,
  getAllTripsFromDB,
  getSingleTripFromBD,
  getMyTripPosts,
  deleteTrip,
};
