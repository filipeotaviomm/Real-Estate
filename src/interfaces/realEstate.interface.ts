import { z } from "zod";
import {
  realEstateCreateSchema,
  realEstatesRead,
} from "../schemas/realEstate.schema";
import { Repository } from "typeorm";
import { Address, RealEstate } from "../entities";

export type TRealEstateCreate = z.infer<typeof realEstateCreateSchema>;
export type TRealEstatesRead = z.infer<typeof realEstatesRead>;

export type TRealEstateRepo = Repository<RealEstate>;

export type TAddressRepo = Repository<Address>;
