export const AvailableRoutes = {
  Home: "/",
  Login: "/auth/login",
  Register: "/auth/register",
  Account: (userId?: string) => `/account/${userId ?? ":userId"}`,
  CreatePost: "/create",
  EditPost: (postId?: string) => `/posts/${postId ?? ":postId"}/edit`,
  Post: (postId?: string) => `/posts/${postId ?? ":postId"}`,
  Search: "/search",
};
