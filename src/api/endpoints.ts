export const authRoutes = {
  LOGIN: "auth/login",

  REGISTER: "auth/register",

  CREATE_POST: "posts/create",

  USER_ACCOUNT_INFO: (userId: string) => `user/${userId}`,

  USER_POSTS: (userId: string | undefined, page?: number) =>
    `user/${userId}/posts${page ? `?page=${page}` : ""}`,

  USER_POST: (postId?: string) => `posts/${postId}`,

  FEED_POSTS: (searchTerm: string, page?: number) =>
    `/feed/${searchTerm}${page ? `?page=${page}` : ""}`,

  FOLLOW_USER: (userId: string) => `user/${userId}/follow`,

  UNFOLLOW_USER: (userId: string) => `user/${userId}/unfollow`,

  USER_FOLLOWS: (userId: string, perPage?: number) =>
    `user/${userId}/follows${perPage ? `?perPage=${perPage}` : ""}`,

  USER_FOLLOWING: (userId: string, perPage?: number) =>
    `user/${userId}/following${perPage ? `?perPage=${perPage}` : ""}`,
};
