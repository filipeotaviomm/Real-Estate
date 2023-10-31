import { Router } from "express";
import { doesUserExist, isEmailUnique } from "../middlewares/users.middleware";
import {
  isUserAdmin,
  isUserLogged,
  validateBody,
  verifyPermission,
} from "../middlewares/globals.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schema";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter.post(
  "/",
  validateBody(userCreateSchema),
  isEmailUnique,
  createUserController
);
usersRouter.get("/", isUserLogged, isUserAdmin, getAllUsersController);

usersRouter.patch(
  "/:userId",
  validateBody(userUpdateSchema),
  doesUserExist,
  isUserLogged,
  verifyPermission,
  isEmailUnique,
  updateUserController
);

usersRouter.delete(
  "/:userId",
  doesUserExist,
  isUserLogged,
  isUserAdmin,
  deleteUserController
);
