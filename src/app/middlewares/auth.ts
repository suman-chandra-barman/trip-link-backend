import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import prisma from "../../shared/prisma";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { UserRole } from "@prisma/client";
import { TAuthUser } from "../interface/common";

const auth = (...requiredRoles: UserRole[]) => {
  return async (
    req: Request & { user?: TAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    try {
      //check token
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      // user
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
          isDeleted: false,
          status: "ACTIVE",
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      //check if the user applies to this route
      if (requiredRoles && !requiredRoles.includes(validTokenUser.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized!");
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
