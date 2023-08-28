import { User } from "../../pages/auth/types";
import { PostPagePost, Watch } from "../Lists/types";

export type PostData = {
  post: PostPagePost;
  creator: User;
  watchData: Watch;
  watchImages: WatchImage[];
};

export type WatchImage = {
  id: string;
  watchId: string;
  data: string;
};
