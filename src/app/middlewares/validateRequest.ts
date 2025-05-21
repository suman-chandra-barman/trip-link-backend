import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = await schema.parseAsync({
        body: req.body,
      });
      req.body = validate.body;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
