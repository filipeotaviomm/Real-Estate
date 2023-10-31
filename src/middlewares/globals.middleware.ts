import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export const isUserLogged = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authorization.split(" ")[1];

  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals.decoded = decoded;

  return next();
};

export const isUserAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export const verifyPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;

  if (admin) return next();

  if (req.params.userId !== sub) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
