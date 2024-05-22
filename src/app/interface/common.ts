import { UserRole } from "@prisma/client";

export type TAuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
} | null;
