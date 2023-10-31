import { z } from "zod";
import {
  categoriesReadSchema,
  categoryCreateSchema,
  categorySchema,
} from "../schemas/categories.schema";
import { Category } from "../entities";
import { Repository } from "typeorm";

export type TCategoryCreate = z.infer<typeof categoryCreateSchema>;
export type TCategoriesRead = z.infer<typeof categoriesReadSchema>;
export type TCategoryRead = z.infer<typeof categorySchema>;

export type TCategoryRepo = Repository<Category>;
