import { NextFunction, Request, Response } from "express";
import { TrapServices } from "./trip.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { TAuthUser } from "../../interface/common";

const createTrip = catchAsync(
  async (
    req: Request & { user?: TAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    const result = await TrapServices.createTripIntoDB(
      user as TAuthUser,
      req.body
    );

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
      "travelDate",
      "travelType",
      "description",
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

const getSingleTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TrapServices.getSingleTripFromBD(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Trips retrieved successfully",
      data: result,
    });
  }
);
export const TripControllers = {
  createTrip,
  getAllTrips,
  getSingleTrip,
};
