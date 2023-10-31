import { User } from "../entities";
import {
  TUserCreate,
  TUserRead,
  TUserUpdate,
  TUsersRead,
} from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import { userReadSchema, usersReadSchema } from "../schemas/users.schema";

export const createUserService = async (
  body: TUserCreate
): Promise<TUserRead> => {
  const user: User = userRepo.create(body);

  await userRepo.save(user);

  return userReadSchema.parse(user);
};

export const getAllUsersService = async (): Promise<TUsersRead> => {
  const users: User[] = await userRepo.find();

  return usersReadSchema.parse(users);
};

export const updateUserService = async (
  body: TUserUpdate,
  user: User
): Promise<TUserRead> => {
  const updatedUser: User = userRepo.create({ ...user, ...body });

  await userRepo.save(updatedUser);

  return userReadSchema.parse(updatedUser);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};
