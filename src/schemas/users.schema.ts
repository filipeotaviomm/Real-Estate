import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullish(),
});

export const userCreateSchema = userSchema.pick({
  name: true,
  email: true,
  admin: true,
  password: true,
});

export const usersReadSchema = z.array(userSchema.omit({ password: true }));
export const userReadSchema = userSchema.omit({ password: true });
export const userUpdateSchema = userCreateSchema
  .omit({ admin: true })
  .partial();

export const sessionSchema = userSchema.pick({
  email: true,
  password: true,
});
