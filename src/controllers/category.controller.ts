import { Request, Response } from "express";
import { Category } from "../entities";
import {
  createCategoryService,
  readAllCategoriesService,
  readRealEstatesbyCategoryService,
} from "../services/category.service";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: Category = await createCategoryService(req.body);

  return res.status(201).json(category);
};

export const readAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await readAllCategoriesService();

  return res.status(200).json(categories);
};

export const readRealEstatesbyCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await readRealEstatesbyCategoryService(
    Number(req.params.categoryId)
  );

  return res.status(200).json(category);
};
