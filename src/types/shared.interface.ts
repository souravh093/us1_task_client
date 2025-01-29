import { JwtPayload } from "jwt-decode";


export interface CustomJwtPayload extends JwtPayload {
  profilePicture?: string;
  id: string;
  email: string;
  premiumMember: boolean;
  role: string;
}
