import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} from "../services/user.service";
import { TUserRead, TUsersRead } from "../interfaces/users.interface";
import { TAllUsers } from "../interfaces/pagination.interface";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUserRead = await createUserService(req.body);

  return res.status(201).json(user);
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TAllUsers = await getAllUsersService(res.locals.pagination);

  return res.status(200).json(users);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await updateUserService(req.body, res.locals.user);

  return res.status(200).json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(res.locals.user);

  return res.status(204).json();
};
