import { UserRole } from "../entities/User";

export interface LoginResponseDTO {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
