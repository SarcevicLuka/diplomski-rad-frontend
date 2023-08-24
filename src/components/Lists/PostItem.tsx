import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { PostResponse } from "./types";
import parse from "html-react-parser";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";

interface PostItemProps {
  post: PostResponse;
}

function PostItem({ post }: PostItemProps) {
  return (
    <Link to={AvailableRoutes.Home} className="post-card">
      <div>{convertToLocaleDate(post.post.createdAt)}</div>
      <div className="post-review mt-2">
        {parse(post.post.review.substring(0, 200))}
      </div>
      <div className="flex justify-content-between mt-2">
        <div className="flex">
          <div className="flex align-items-center mr-3">
            <i className="pi pi-heart mr-1"></i>
            {post.numLikes}
          </div>
          <div className="flex align-items-center">
            <i className="pi pi-comment mr-1"></i>
            {post.numComments}
          </div>
        </div>
        <Rating value={post.post.score} cancel={false} readOnly />
      </div>
      <Divider />
    </Link>
  );
}

export default PostItem;
