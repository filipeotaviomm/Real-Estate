import { Request, Response } from "express";
import {
  createScheduleService,
  readAllSchedulesByRealEstateService,
} from "../services/schedule.service";

export const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decoded;

  await createScheduleService(req.body, sub);

  return res.status(201).json({ message: "Schedule created" });
};

export const readAllSchedulesByRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedules = await readAllSchedulesByRealEstateService(
    +req.params.realEstateId
  );

  return res.status(200).json(schedules);
};
