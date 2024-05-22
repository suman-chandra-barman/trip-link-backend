export type TUserCreateData = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};
