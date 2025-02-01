import { ISession } from "./session.interface";
import { IUser } from "./user.interface";

export interface IReview {
  id: string;
  sessionId: string;
  rating: number;
  comment: string;
  reviewerId: string;
  createdAt: string;
  updatedAt: string;
  reviewer: IUser;
  session: ISession;
}
