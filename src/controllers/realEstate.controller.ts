import { Request, Response } from "express";
import {
  createRealEstateService,
  readAllRealEstateService,
} from "../services/realEstate.service";
import { TAllRealEstates } from "../interfaces/pagination.interface";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await createRealEstateService(req.body);

  return res.status(201).json(realEstate);
};

export const readAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates: TAllRealEstates = await readAllRealEstateService(
    res.locals.pagination
  );

  return res.status(200).json(realEstates);
};
