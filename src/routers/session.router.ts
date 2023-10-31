import { Router } from "express";
import { validateBody } from "../middlewares/globals.middleware";
import { loginController } from "../controllers/session.controller";
import { sessionSchema } from "../schemas/users.schema";

export const sessionRouter = Router();

sessionRouter.post("/", validateBody(sessionSchema), loginController);
