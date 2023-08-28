import { useContext } from "react";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { PostResponse } from "./types";
import parse from "html-react-parser";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import classNames from "classnames";
import { AuthContext } from "../../provider/AuthProvider";

interface PostItemProps {
  post: PostResponse;
}

function PostItem({ post }: PostItemProps) {
  const { user, token } = useContext(AuthContext);

  const likeIconStyle = classNames({
    "pi pi-heart-fill": post.isLiked && token,
    "pi pi-heart": !post.isLiked,
    "mr-1": true,
  });

  const avatarStyle = classNames({
    "border-indigo-400 border-2": user?.id === post.creator.id,
    "mr-3": true,
  });

  return (
    <>
      <div className="header flex align-items-center justify-content-between">
        <div className="flex align-items-center">
          <Link to={AvailableRoutes.Account(post.creator.id)}>
            <Avatar
              image={post.creator.avatar}
              size="large"
              shape="circle"
              className={avatarStyle}
            />
          </Link>
          <div className="flex flex-column">
            <div className="text-lg font-medium">{`${post.creator.firstName} ${post.creator.lastName}`}</div>
            <div>{convertToLocaleDate(post.post.createdAt)}</div>
          </div>
        </div>
        <div>
          <Tag
            className="text-base"
            value={`${post.watchData.brand}  ${post.watchData.model}`}
          />
        </div>
      </div>
      <Link to={AvailableRoutes.Post(post.post.id)} className="post-card">
        <div className="post-review mt-2">
          {parse(post.post.review.substring(0, 200))}
        </div>
      </Link>
      <div className="flex justify-content-between mt-2">
        <div className="flex">
          <div className="flex align-items-center mr-3">
            <i className={likeIconStyle}></i>
            {post.post.numOfLikes}
          </div>
          <div className="flex align-items-center">
            <i className="pi pi-comment mr-1"></i>
            {post.post.numOfComments}
          </div>
        </div>
        <Rating
          value={post.post.score}
          cancel={false}
          readOnly
          tooltip="Creator score"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      <Divider />
    </>
  );
}

export default PostItem;
