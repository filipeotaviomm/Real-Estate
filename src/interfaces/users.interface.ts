import { z } from "zod";
import {
  sessionSchema,
  userCreateSchema,
  userReadSchema,
} from "../schemas/users.schema";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserRead = z.infer<typeof userReadSchema>;
export type TUsersRead = TUserRead[];
export type TuserBodyUpdate = Omit<TUserCreate, "admin">;
export type TUserUpdate = DeepPartial<TuserBodyUpdate>;
export type TUserRepo = Repository<User>;

export type TSessionCreate = z.infer<typeof sessionSchema>;
export type TSessionReturn = { token: string };
