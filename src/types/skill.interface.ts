import { IAvailability } from "./availability.interface";
import { ISession } from "./session.interface";
import { IUser } from "./user.interface";

export interface ISkill {
  id: string;
  name: string;
  category: string;
  level: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  availability: IAvailability[];
  session: ISession[];
}
