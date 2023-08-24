export const AvailableRoutes = {
  Home: "/",
  Login: "/auth/login",
  Register: "/auth/register",
  Account: (userId?: string) => `/account/${userId ?? ":userId"}`,
  CreatePost: "/create",
};
