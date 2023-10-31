import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoriesReadSchema = z.array(categorySchema);
