export type WatchUserData = {
  brand: string;
  model: string;
  diameter: number;
  lugWidth: number;
  caseMaterial: string;
  mechanismModel: string;
};

export type CreatePostFromData = {
  brand: string;
  model: string;
  diameter: number;
  lugWidth: number;
  caseMaterial: string;
  mechanismModel: string;
  review: string;
  score: number;
  images: Array<string>;
};

export type EditPostFromData = {
  brand: string;
  model: string;
  diameter: number;
  lugWidth: number;
  caseMaterial: string;
  mechanismModel: string;
  review: string;
  score: number;
};

export type CreateCommentFromData = {
  text: string;
  score: number;
};

export type CreatePostData = {
  watchData: WatchUserData;
  images: ImageData[];
  review: string;
  score: number;
};

export type EditPostData = {
  watchData: WatchUserData;
  review: string;
  score: number;
};

export type ImageData = {
  data: string;
};
