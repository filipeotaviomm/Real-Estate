import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import { TScheduleCreate } from "../interfaces/schedule.interface";
import { realEstateRepo, scheduleRepo, userRepo } from "../repositories";

export const createScheduleService = async (
  body: TScheduleCreate,
  userId: number
): Promise<Schedule> => {
  const { date, hour, realEstateId } = body;

  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: realEstateId,
  });

  // const time = Number(hour.split(":")[0]); pode usar essa linha sem os parsesInts da linha de baixo, ou a linha de baixo como está.
  if (parseInt(hour) < 8 || parseInt(hour) >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const newDate = new Date(date).getDay();

  if (newDate < 1 || newDate > 5) {
    //0 = domingo - 5 = sábado
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const user: User | null = await userRepo.findOneBy({ id: userId });

  const createSchedule: Schedule = scheduleRepo.create({
    ...body,
    realEstate: realEstate!,
    user: user!,
  });

  return await scheduleRepo.save(createSchedule);
};

export const readAllSchedulesByRealEstateService = async (
  realEstateId: Number
): Promise<RealEstate> => {
  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: +realEstateId,
    },
    relations: {
      schedules: {
        user: true,
      },
      address: true,
      category: true,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};
