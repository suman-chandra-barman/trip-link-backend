import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.login(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: result,
    });
  }
);

export const AuthControllers = {
  login,
};
