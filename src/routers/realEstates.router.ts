import { Router } from "express";
import {
  isUserAdmin,
  isUserLogged,
  validateBody,
} from "../middlewares/globals.middleware";
import { realEstateCreateSchema } from "../schemas/realEstate.schema";
import { isAddressUnique } from "../middlewares/realEstates.middleware";
import {
  createRealEstateController,
  readAllRealEstateController,
} from "../controllers/realEstate.controller";
import { pagination } from "../middlewares/pagination.middleware";

export const realEstatesRouter = Router();

realEstatesRouter.post(
  "/",
  isUserLogged,
  isUserAdmin,
  validateBody(realEstateCreateSchema),
  isAddressUnique,
  createRealEstateController
);
realEstatesRouter.get(
  "/",
  pagination("/realEstate"),
  readAllRealEstateController
);
