export const AuthRoutes = {
  LOGIN: "auth/login",

  REGISTER: "auth/register",
};

export const UserRoutes = {
  USER_ACCOUNT_INFO: (userId: string) => `user/${userId}`,

  FOLLOW_USER: (userId: string) => `user/${userId}/follow`,

  UNFOLLOW_USER: (userId: string) => `user/${userId}/unfollow`,

  USER_FOLLOWS: (userId: string, perPage?: number) =>
    `user/${userId}/follows${perPage ? `?perPage=${perPage}` : ""}`,

  USER_FOLLOWING: (userId: string, perPage?: number) =>
    `user/${userId}/following${perPage ? `?perPage=${perPage}` : ""}`,

  USER_LIKES: (userId?: string) => `user/${userId}/likes}`,
};

export const PostRoutes = {
  CREATE_POST: "posts/create",

  CREATE_COMMENT: (postId?: string) => `posts/${postId}/comments/create`,

  USER_POSTS: (userId: string | undefined, page?: number) =>
    `user/${userId}/posts${page ? `?page=${page}` : ""}`,

  USER_POST: (postId?: string) => `posts/${postId}`,

  FEED_POSTS: (searchTerm: string, page?: number) =>
    `/feed/${searchTerm}${page ? `?page=${page}` : ""}`,

  POST_COMMENTS: (postId: string, page?: number) =>
    `/posts/${postId}/comments${page ? `?page=${page}` : ""}`,
};
