export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}
