import { Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const id = req?.user?.id;
    const result = await UserServices.getUserProfileFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const updateUserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const id = req?.user?.id;
    const result = await UserServices.updateUserProfileIntoDB(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const UserControllers = {
  createUser,
  getUserProfile,
  updateUserProfile,
};
