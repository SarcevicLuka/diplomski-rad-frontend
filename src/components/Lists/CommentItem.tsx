import { Dispatch, SetStateAction, useContext, useState } from "react";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { CommentResponse, EditCommentUserData } from "./types";
import { AuthContext } from "../../provider/AuthProvider";
import classNames from "classnames";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { Divider } from "primereact/divider";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputTextarea } from "primereact/inputtextarea";

interface CommentItemProps {
  commentData: CommentResponse;
  setComments: Dispatch<SetStateAction<CommentResponse[]>>;
}

function CommentItem({ commentData, setComments }: CommentItemProps) {
  const { user, token } = useContext(AuthContext);
  const { axiosInstance } = useAxios();
  const [isLiked, setIsLiked] = useState<boolean>(commentData.isLiked);
  const [likeCount, setLikeCount] = useState<number>(
    commentData.comment.numOfLikes
  );
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedCommentScore, setEditedCommentScore] = useState<number>(
    commentData.comment.score
  );
  const [editedCommentText, setEditedCommentText] = useState<string>(
    commentData.comment.text
  );

  const accept = () => {
    handleDeleteComment();
  };

  const reject = () => {
    setVisible(false);
  };

  const handleDeleteComment = () => {
    axiosInstance
      .delete(PostRoutes.DELETE_COMMENT(commentData.comment.id))
      .then(() => {
        setComments((current) =>
          current.filter((comment) => {
            return comment.comment.id !== commentData.comment.id;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleEditComment = () => {
    const values: EditCommentUserData = {
      text: editedCommentText,
      score: editedCommentScore,
    };

    axiosInstance
      .patch(PostRoutes.EDIT_COMMENT(commentData.comment.id), values)
      .then((response) => {
        console.log(response);
        setEditing(false);
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
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Are you sure you want to delete your comment?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
          accept={accept}
          reject={reject}
        />
        {token && commentData.creator.id === user?.id && editing ? (
          <div>
            <i
              className="pi pi-check-square mr-2 cursor-pointer"
              style={{ fontSize: "1.2rem", color: "green" }}
              onClick={() => {
                console.log(editedCommentScore);
                console.log(editedCommentText);
                handleEditComment();
              }}
            />
            <i
              className="pi pi-times mr-1 cursor-pointer"
              style={{ fontSize: "1.2rem", color: "red" }}
              onClick={() => setEditing(false)}
            />
          </div>
        ) : (
          <div>
            <i
              className="pi pi-file-edit mr-2 cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              onClick={() => setEditing(true)}
            />
            <i
              className="pi pi-trash mr-1 cursor-pointer"
              style={{ fontSize: "1.2rem", color: "red" }}
              onClick={() => setVisible(true)}
            />
          </div>
        )}
      </div>
      {editing ? (
        <InputTextarea
          value={editedCommentText}
          onChange={(e) => {
            setEditedCommentText(e.target.value);
          }}
          rows={2}
          className="w-full"
        />
      ) : (
        <div className="post-review mt-2">{editedCommentText}</div>
      )}
      <div className="flex justify-content-between mt-2">
        <div className="flex">
          <div className="flex align-items-center mr-3">
            <i
              style={{ color: "var(--primary-color)" }}
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
          value={editedCommentScore}
          cancel={false}
          readOnly={!editing}
          tooltip="Commentor score"
          tooltipOptions={{ position: "bottom" }}
          onChange={(e: RatingChangeEvent) => setEditedCommentScore(e.value!)}
        />
      </div>
      <Divider />
    </div>
  );
}

export default CommentItem;
