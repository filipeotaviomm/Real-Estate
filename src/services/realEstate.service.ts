import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  TAllRealEstates,
  TPaginationParams,
} from "../interfaces/pagination.interface";
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

  const createAddress: Address = addressRepo.create(body.address);
  const address: Address = await addressRepo.save(createAddress);

  const createRealEstate: RealEstate = realEstateRepo.create({
    ...body,
    address: address,
    category: category,
  });

  return await realEstateRepo.save(createRealEstate);
};

export const readAllRealEstateService = async ({
  page,
  perPage,
  prevPage,
  nextPage,
  order,
  sort,
}: TPaginationParams): Promise<TAllRealEstates> => {
  const [realEstates, count] = await realEstateRepo.findAndCount({
    order: { [sort]: order },
    skip: page,
    take: perPage,
  });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    data: realEstates,
    count,
  };
};
