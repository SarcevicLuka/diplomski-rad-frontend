import { useContext } from "react";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { CommentResponse } from "./types";
import { AuthContext } from "../../provider/AuthProvider";
import classNames from "classnames";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";

interface CommentItemProps {
  commentData: CommentResponse;
}

function CommentItem({ commentData }: CommentItemProps) {
  const { user, token } = useContext(AuthContext);

  const likeIconStyle = classNames({
    "pi pi-heart-fill": commentData.isLiked && token,
    "pi pi-heart": !commentData.isLiked || !token,
    "mr-1": true,
  });

  const avatarStyle = classNames({
    "border-indigo-400 border-2": user?.id === commentData.creator.id,
    "mr-3": true,
  });

  return (
    <div key={commentData.comment.id}>
      <div className="header flex align-items-center justify-content-between w-17rem sm:w-30rem">
        <div className="flex align-items-center">
          <Link to={AvailableRoutes.Account(commentData.creator.id)}>
            <Avatar
              image={commentData.creator.avatar}
              size="large"
              shape="circle"
              className={avatarStyle}
            />
          </Link>
          <div className="flex flex-column">
            <div className="text-lg font-medium">{`${commentData.creator.firstName} ${commentData.creator.lastName}`}</div>
            <div>{convertToLocaleDate(commentData.comment.createdAt)}</div>
          </div>
        </div>
      </div>
      <div className="post-review mt-2">{commentData.comment.text}</div>
      <div className="flex justify-content-between mt-2">
        <div className="flex">
          <div className="flex align-items-center mr-3">
            <i className={likeIconStyle}></i>
            {commentData.comment.numOfLikes}
          </div>
        </div>
        <Rating
          value={commentData.comment.score}
          cancel={false}
          readOnly
          tooltip="Commentor score"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      <Divider />
    </div>
  );
}

export default CommentItem;
