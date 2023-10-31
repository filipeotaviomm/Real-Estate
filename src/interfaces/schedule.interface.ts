import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  scheduleCreateSchema,
  schedulesReadSchema,
} from "../schemas/schedule.schema";

export type TScheduleCreate = z.infer<typeof scheduleCreateSchema>;
export type TSchedulesRead = z.infer<typeof schedulesReadSchema>;

export type TScheduleRepo = Repository<Schedule>;
