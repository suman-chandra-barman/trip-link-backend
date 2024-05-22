import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelpers";
import { TTrip } from "./trip.interface";
import { TAuthUser } from "../../interface/common";

const createTripIntoDB = async (user: TAuthUser, payload: TTrip) => {
  if (!user) {
    throw new Error("User not found!");
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
  const { searchTerm, minBudget, maxBudget, ...filterData } = query;

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions: Prisma.TripWhereInput[] = [];

  //search trip by searchTerm
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
          budget: Number(query.searchTerm) || Number(),
        },
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

export const TrapServices = {
  createTripIntoDB,
  getAllTripsFromDB,
};
