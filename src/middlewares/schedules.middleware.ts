import { NextFunction, Request, Response } from "express";
import { realEstateRepo, scheduleRepo } from "../repositories";
import { AppError } from "../errors";
import { RealEstate, Schedule } from "../entities";

export const doesRealEstateExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: Number(req.body.realEstateId),
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export const isScheduleAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = req.body;
  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      realEstate: {
        id: realEstateId,
      },
      date: date,
      hour: hour,
    },
  });

  if (schedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};

export const isScheduleAlreadyTakenByMyself = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      user: {
        id: res.locals.decoded.sub,
      },
      realEstate: {
        id: req.body.realEstateId,
      },
      date: req.body.date,
      hour: req.body.hour,
    },
  });

  if (schedule) {
    throw new AppError(
      "You have booked an appointment at this place at this same date and time",
      409
    );
  }

  return next();
};

export const bookingTwoPlacesAtSameTime = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      user: {
        id: res.locals.decoded.sub,
      },
      date: req.body.date,
      hour: req.body.hour,
    },
  });

  if (schedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};
