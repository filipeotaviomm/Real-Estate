import "dotenv/config";
import { compare } from "bcryptjs";
import { User } from "../entities";
import { AppError } from "../errors";
import { userRepo } from "../repositories";
import { sign } from "jsonwebtoken";
import { TSessionCreate, TSessionReturn } from "../interfaces/users.interface";

export const loginService = async (
  body: TSessionCreate
): Promise<TSessionReturn> => {
  const user: User | null = await userRepo.findOneBy({ email: body.email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const verifyPass: boolean = await compare(body.password, user.password);

  if (!verifyPass) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};
