import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorResponse = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong!",
    errorDetails: err || {},
  };

  //handle zod error
  if (err instanceof ZodError) {
    const errorMessages = err.issues.map((issue) => issue.message).join(". ");

    const issues = err.issues.map((issue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const errDetails = {
      issues,
    };

    errorResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      message: errorMessages,
      errorDetails: errDetails,
    };
  }

  res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
  });
};
export default globalErrorHandler;
