import { NextFunction, Request, Response } from "express";
import { addressRepo } from "../repositories";
import { AppError } from "../errors";
import { Address } from "../entities";

export const isAddressUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { address } = req.body;
  const addressSearch: Address | null = await addressRepo.findOne({
    where: {
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    },
  });

  if (addressSearch) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};
