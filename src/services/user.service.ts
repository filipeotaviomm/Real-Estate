import { User } from "../entities";
import {
  TAllUsers,
  TPaginationParams,
} from "../interfaces/pagination.interface";
import {
  TUserCreate,
  TUserRead,
  TUserUpdate,
} from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import { userReadSchema, usersReadSchema } from "../schemas/users.schema";

export const createUserService = async (
  body: TUserCreate
): Promise<TUserRead> => {
  const createUser: User = userRepo.create(body);
  const user: User = await userRepo.save(createUser);

  return userReadSchema.parse(user);
};

export const getAllUsersService = async ({
  page,
  perPage,
  prevPage,
  nextPage,
  order,
  sort,
}: TPaginationParams): Promise<TAllUsers> => {
  const [users, count] = await userRepo.findAndCount({
    order: { [sort]: order },
    skip: page,
    take: perPage,
  });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    data: usersReadSchema.parse(users),
    count,
  };
};

export const updateUserService = async (
  body: TUserUpdate,
  user: User
): Promise<TUserRead> => {
  const updatedUser: User = userRepo.create({ ...user, ...body });

  const userUpdt = await userRepo.save(updatedUser);

  return userReadSchema.parse(userUpdt);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};
