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

  EDIT_POST: (postId?: string) => `posts/${postId}/edit`,

  CREATE_COMMENT: (postId?: string) => `posts/${postId}/comments/create`,

  DELETE_COMMENT: (commentId?: string) => `comments/${commentId}/delete`,

  LIKE_COMMENT: (commentId?: string) => `comments/${commentId}/like`,

  EDIT_COMMENT: (commentId?: string) => `comments/${commentId}/edit`,

  REMOVE_LIKE_COMMENT: (commentId?: string) =>
    `comments/${commentId}/remove-like`,

  LIKE_POST: (postId?: string) => `posts/${postId}/like`,

  REMOVE_LIKE_POST: (postId?: string) => `posts/${postId}/remove-like`,

  USER_POSTS: (userId: string | undefined, page?: number) =>
    `user/${userId}/posts${page ? `?page=${page}` : ""}`,

  USER_POST: (postId?: string) => `posts/${postId}`,

  FEED_POSTS: (searchTerm: string, page?: number) =>
    `/feed/${searchTerm}${page ? `?page=${page}` : ""}`,

  POST_COMMENTS: (postId: string, page?: number) =>
    `/posts/${postId}/comments${page ? `?page=${page}` : ""}`,
};
