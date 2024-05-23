export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  profile: {
    contactNumber: string;
    age: number;
  };
};
