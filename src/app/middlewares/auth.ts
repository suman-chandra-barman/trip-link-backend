import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import prisma from "../../shared/prisma";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      //check is token exists
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      //token user
      let validTokenUser: JwtPayload = {};

      //check token is valid
      jwt.verify(token, config.jwt.secret as string, function (err, decode) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }
        validTokenUser = decode as JwtPayload;
      });

      //check user is exists
      const user = await prisma.user.findUnique({
        where: {
          email: validTokenUser.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      //set token user in express request
      req.user = user;

      //call next controller
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
