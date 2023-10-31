import { z } from "zod";

export const realEstateSchema = z.object({
  id: z.number().positive().int(),
  sold: z.boolean().default(false),
  value: z.string().or(z.number().nonnegative()).default(0),
  size: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.number().positive(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.number().positive().int(),
});

export const realEstateCreateSchema = realEstateSchema.pick({
  value: true,
  size: true,
  address: true,
  categoryId: true,
});

export const realEstatesRead = z.array(realEstateSchema);
