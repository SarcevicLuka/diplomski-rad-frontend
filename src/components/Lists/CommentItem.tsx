import { useContext, useState } from "react";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { CommentResponse } from "./types";
import { AuthContext } from "../../provider/AuthProvider";
import classNames from "classnames";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";

interface CommentItemProps {
  commentData: CommentResponse;
}

function CommentItem({ commentData }: CommentItemProps) {
  const { user, token } = useContext(AuthContext);
  const { axiosInstance } = useAxios();
  const [isLiked, setIsLiked] = useState<boolean>(commentData.isLiked);
  const [likeCount, setLikeCount] = useState<number>(
    commentData.comment.numOfLikes
  );

  const likeIconStyle = classNames({
    "pi pi-heart-fill": isLiked && token,
    "pi pi-heart": !isLiked || !token,
    "mr-1": true,
    "cursor-pointer": token,
  });

  const avatarStyle = classNames({
    "border-indigo-400 border-2": user?.id === commentData.creator.id,
    "mr-3": true,
  });

  const handleLikeComment = () => {
    axiosInstance
      .post(PostRoutes.LIKE_COMMENT(commentData.comment.id))
      .then(() => {
        setIsLiked(!isLiked);
        setLikeCount(likeCount + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveLikeComment = () => {
    axiosInstance
      .post(PostRoutes.REMOVE_LIKE_COMMENT(commentData.comment.id))
      .then(() => {
        setIsLiked(!isLiked);
        setLikeCount(likeCount - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <i
              className={likeIconStyle}
              onClick={() => {
                if (!token) return;
                !isLiked ? handleLikeComment() : handleRemoveLikeComment();
              }}
            ></i>
            {likeCount}
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
