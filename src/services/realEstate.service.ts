import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import { TRealEstateCreate } from "../interfaces/realEstate.interface";
import { addressRepo, categoryRepo, realEstateRepo } from "../repositories";

export const createRealEstateService = async (
  body: TRealEstateCreate
): Promise<RealEstate> => {
  const category: Category | null = await categoryRepo.findOneBy({
    id: body.categoryId,
  });

  if (!category) {
    throw new AppError("Category no found", 404);
  }

  const address: Address = await addressRepo.save(body.address);

  const realEstate: RealEstate = await realEstateRepo.save({
    ...body,
    address: address,
    category: category,
  });

  return realEstate;
};

export const readAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstates: RealEstate[] = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return realEstates;
};
