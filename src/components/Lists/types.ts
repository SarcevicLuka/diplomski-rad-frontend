export type Post = {
  id: string;
  userId: string;
  watchId: string;
  review: string;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type PostResponse = {
  post: Post;
  numLikes: number;
  numComments: number;
};
