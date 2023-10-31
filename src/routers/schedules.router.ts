import { Router } from "express";
import {
  isUserAdmin,
  isUserLogged,
  validateBody,
} from "../middlewares/globals.middleware";
import { scheduleCreateSchema } from "../schemas/schedule.schema";
import {
  isScheduleAlreadyTakenByMyself,
  bookingTwoPlacesAtSameTime,
  doesRealEstateExist,
  isScheduleAvailable,
} from "../middlewares/schedules.middleware";
import {
  createScheduleController,
  readAllSchedulesByRealEstateController,
} from "../controllers/schedule.controller";

export const schedulesRouter = Router();

schedulesRouter.post(
  "/",
  isUserLogged,
  validateBody(scheduleCreateSchema),
  doesRealEstateExist,
  isScheduleAvailable,
  isScheduleAlreadyTakenByMyself,
  bookingTwoPlacesAtSameTime,
  createScheduleController
);
schedulesRouter.get(
  "/realEstate/:realEstateId",
  isUserLogged,
  isUserAdmin,
  readAllSchedulesByRealEstateController
);
