import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { AppError } from "../errors";
import { User } from "../entities";

export const isEmailUnique = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const containsEmail = req.body.email;

  if (!containsEmail) return next();

  const email: User | null = await userRepo.findOneBy({
    email: req.body.email,
  });

  if (email) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export const doesUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User | null = await userRepo.findOneBy({
    id: Number(req.params.userId),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.locals.user = user;

  return next();
};
