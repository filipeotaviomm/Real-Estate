import { Router } from "express";
import { isCategoryUnique } from "../middlewares/categories.middleware";
import {
  isUserAdmin,
  isUserLogged,
  validateBody,
} from "../middlewares/globals.middleware";
import { categoryCreateSchema } from "../schemas/categories.schema";
import {
  createCategoryController,
  readAllCategoriesController,
  readRealEstatesbyCategoryController,
} from "../controllers/category.controller";

export const categoriesRouter = Router();

categoriesRouter.post(
  "/",
  isUserLogged,
  isUserAdmin,
  validateBody(categoryCreateSchema),
  isCategoryUnique,
  createCategoryController
);
categoriesRouter.get("/", readAllCategoriesController);
categoriesRouter.get(
  "/:categoryId/realEstate",
  readRealEstatesbyCategoryController
);
