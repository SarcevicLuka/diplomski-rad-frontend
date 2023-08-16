export type LoginUserData = {
  email: string;
  password: string;
};

export type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserAuthResponse = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
