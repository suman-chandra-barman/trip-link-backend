import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { Routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//app routers
app.use("/api/v1", Routes);

//root route
app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    statuscode: 200,
    message: "Welcome to Trip Link Server",
  });
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
