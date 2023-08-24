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
};
