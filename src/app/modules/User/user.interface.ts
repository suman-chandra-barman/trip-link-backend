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
