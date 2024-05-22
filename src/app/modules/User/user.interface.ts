import { UserRole } from "@prisma/client";

export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile: {
    contactNumber: string;
    age: number;
  };
};
