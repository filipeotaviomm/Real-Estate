import { NextFunction, Request, Response } from "express";
import { categoryRepo } from "../repositories";
import { AppError } from "../errors";
import { Category } from "../entities";

export const isCategoryUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const category: Category | null = await categoryRepo.findOneBy({
    name: req.body.name,
  });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
