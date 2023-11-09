import { Category } from "../entities";
import { AppError } from "../errors";
import {
  TCategoriesRead,
  TCategoryCreate,
} from "../interfaces/categories.interface";
import { categoryRepo } from "../repositories";

export const createCategoryService = async (
  body: TCategoryCreate
): Promise<Category> => {
  const createCategory: Category = categoryRepo.create(body);
  return await categoryRepo.save(createCategory);
};

export const readAllCategoriesService = async (): Promise<TCategoriesRead> => {
  const categories: TCategoriesRead = await categoryRepo.find();
  return categories;
};

export const readRealEstatesbyCategoryService = async (
  categoryId: number
): Promise<Category> => {
  const category: Category | null = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
    // relations: {
    //   realEstate: {
    //     address: true,
    //   },
    // },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};
