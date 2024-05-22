import { NextFunction, Request, Response } from "express";
import { TrapServices } from "./trip.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

const createTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || "";

    const result = await TrapServices.createTripIntoDB(token, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Trip created successfully",
      data: result,
    });
  }
);

const getAllTrips = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filteredQuery = pick(req.query, [
      "searchTerm",
      "destination",
      "startDate",
      "endDate",
      "minBudget",
      "maxBudget",
    ]);

    const paginationOptions = pick(req.query, [
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);

    const result = await TrapServices.getAllTripsFromDB(
      filteredQuery,
      paginationOptions
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Trips retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
export const TripControllers = {
  createTrip,
  getAllTrips,
};
