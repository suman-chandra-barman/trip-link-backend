import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TAuthUser } from "../../interface/common";
import httpStatus from "http-status";

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
const changePassword = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AuthServices.changePassword(
      user as TAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password is changed successfully!",
      data: result,
    });
  }
);

export const AuthControllers = {
  login,
  changePassword,
};
