import { Category, RealEstate, Schedule } from "../entities";
import { TUsersRead } from "./users.interface";

// export type TPagination = {
//   prevPage: string | null;
//   nextPage: string | null;
//   count: number;
//   data: Movie[];
// };

export type TPaginationParams = {
  page: number;
  perPage: number;
  order: string;
  sort: string;
  prevPage: string | null;
  nextPage: string | null;
};

export type TAllUsers = {
  prevPage: string | null;
  nextPage: string | null;
  data: TUsersRead;
  count: number;
};

export type TAllRealEstates = {
  prevPage: string | null;
  nextPage: string | null;
  data: RealEstate[];
  count: number;
};
