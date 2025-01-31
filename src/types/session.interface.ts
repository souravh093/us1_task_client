import { IAvailability } from "./availability.interface";
import { ISkill } from "./skill.interface";
import { IUser } from "./user.interface";

export interface ISession {
  id: string;
  skillId: string;
  requestorId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  meetingLink?: string;
  availabilityId: string;
  availability: IAvailability;
  createdAt: string;
  updatedAt: string;
  requestor: IUser;
  skill: ISkill;
}
