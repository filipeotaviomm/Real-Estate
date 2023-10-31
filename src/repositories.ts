import { Repository } from "typeorm";
import { Address, Category, RealEstate, Schedule, User } from "./entities";
import { AppDataSource } from "./data-source";

export const addressRepo: Repository<Address> =
  AppDataSource.getRepository(Address);

export const categoryRepo: Repository<Category> =
  AppDataSource.getRepository(Category);

export const realEstateRepo: Repository<RealEstate> =
  AppDataSource.getRepository(RealEstate);

export const scheduleRepo: Repository<Schedule> =
  AppDataSource.getRepository(Schedule);

export const userRepo: Repository<User> = AppDataSource.getRepository(User);
