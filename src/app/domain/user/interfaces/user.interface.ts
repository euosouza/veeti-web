import { UserRole } from "../enums/user-role.enum";

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ICreateUser {
  email: string;
  passwordHash: string;
  role: UserRole;
}
