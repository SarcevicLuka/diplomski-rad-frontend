export const authRoutes = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  CREATE_POST: "posts/create",
  USER_ACCOUNT_INFO: (userId: number) => `user/${userId}`,
};
