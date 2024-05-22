import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { Routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(cors());
app.use(express.json());

//app routers
app.use("/api", Routes);

//root route
app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    statuscode: 200,
    message: "Welcome to Travel Buddy Matching Server",
  });
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
