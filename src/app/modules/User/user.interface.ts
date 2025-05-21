import { Gender } from "@prisma/client";

export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  profile: {
    contactNumber: string;
    gender: Gender;
  };
};

export type TUserUpdateData = {
  userId: string;
  role?: "ADMIN" | "USER";
  status?: "ACTIVE" | "DEACTIVE";
  isDeleted?: boolean;
};
