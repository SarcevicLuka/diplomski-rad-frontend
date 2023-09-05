import { User } from "../../pages/auth/types";

export type Post = {
  id: string;
  userId: string;
  watchId: string;
  review: string;
  score: number;
  numOfLikes: number;
  numOfComments: number;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  userId: string;
  postId: string;
  text: string;
  score: number;
  numOfLikes: number;
  createdAt: string;
  updatedAt: string;
};

export type Watch = {
  id: string;
  brand: string;
  model: string;
  diameter: number;
  lugWidth: number;
  caseMaterial: string;
  mechanismModel: string;
  createdAt: string;
  updatedAt: string;
};

export type PostResponse = {
  post: Post;
  creator: User;
  watchData: Watch;
  isLiked: boolean;
};

export type PostPagePost = {
  id: string;
  userId: string;
  watchId: string;
  text: string;
  score: number;
  avgCommentScore: number;
  numOfLikes: number;
  isLikedByUser: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CommentResponse = {
  comment: Comment;
  creator: User;
  isLiked: boolean;
};
