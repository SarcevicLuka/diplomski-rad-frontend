import { useContext, useEffect, useRef, useState } from "react";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";
import { PostData } from "./types";
import CustomCard from "../CustomCard";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Avatar } from "primereact/avatar";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { ProgressSpinner } from "primereact/progressspinner";
import ImageGalleria from "./ImageGalleria";
import parse from "html-react-parser";
import WatchDetailsTable from "./WatchDetailsTable";
import { Button } from "primereact/button";
import { AuthContext } from "../../provider/AuthProvider";
import CommentSection from "../CommentSection";
import { Divider } from "primereact/divider";

interface PostProps {
  postId?: string;
}

function Post({ postId }: PostProps) {
  const { axiosInstance } = useAxios();
  const { token } = useContext(AuthContext);
  const useEffectCalled = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleGetPostData = () => {
    setLoading(true);
    axiosInstance
      .get(PostRoutes.USER_POST(postId))
      .then((response) => {
        console.log(response.data);
        setPostData(response.data);
        setLiked(response.data.post.isLikedByUser);
        setLikeCount(response.data.post.numOfLikes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLikePost = () => {
    axiosInstance
      .post(PostRoutes.LIKE_POST(postData?.post.id))
      .then(() => {
        setLiked(!liked);
        setLikeCount(likeCount! + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveLikePost = () => {
    axiosInstance
      .post(PostRoutes.REMOVE_LIKE_POST(postData?.post.id))
      .then(() => {
        setLiked(!liked);
        setLikeCount(likeCount! - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (useEffectCalled.current) return;
    useEffectCalled.current = true;

    handleGetPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ProgressSpinner />
  ) : (
    postData && (
      <CustomCard
        title={`${postData?.watchData.brand} ${postData?.watchData.model} review`}
      >
        <div>
          <div className="header">
            <div className="flex justify-content-between align-items-center">
              <div className="flex flex-row">
                <Link to={AvailableRoutes.Account(postData.creator.id)}>
                  <Avatar
                    image={postData.creator.avatar}
                    size="large"
                    shape="circle"
                  />
                </Link>
                <div className="flex flex-column ml-2">
                  <div className="font-medium">
                    Author:{" "}
                    {`${postData.creator.firstName} ${postData.creator.lastName}`}
                  </div>
                  <div>
                    Posted: {convertToLocaleDate(postData.post.updatedAt)}
                  </div>
                </div>
              </div>
              <div className="flex flex-column align-items-center justify-content-center">
                <Button
                  label={likeCount.toString()}
                  icon={token && liked ? "pi pi-heart-fill" : "pi pi-heart"}
                  style={{ color: "var(--primary-color)" }}
                  rounded
                  text
                  raised
                  disabled={!token}
                  severity="help"
                  aria-label="Favorite"
                  tooltip="Like post"
                  tooltipOptions={{ position: "bottom" }}
                  onClick={() =>
                    !liked ? handleLikePost() : handleRemoveLikePost()
                  }
                />
                <div className="mt-1">
                  User score: {postData.post.score}
                  <i
                    className="pi pi-star-fill"
                    style={{ color: "var(--primary-color)" }}
                  ></i>
                </div>
                <div className="mt-1">
                  {postData.post.avgCommentScore !== 0 ? (
                    <div>
                      {`Avg. reader score: ${postData.post.avgCommentScore}`}
                      <i
                        className="pi pi-star-fill"
                        style={{ color: "var(--primary-color)" }}
                      ></i>
                    </div>
                  ) : (
                    "No comment score"
                  )}
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="review mt-4">
            <div className="text-xl font-medium">Review:</div>
            <div className="text-lg">{parse(postData.post.text)}</div>
          </div>
          <WatchDetailsTable watchDetails={postData.watchData} />
          <ImageGalleria images={postData.watchImages} />
          <Divider
            className="text-xl"
            pt={{ content: { className: "text-primary" } }}
            align="center"
          >
            <b>Comments:</b>
          </Divider>
          <CommentSection postId={postId} />
        </div>
      </CustomCard>
    )
  );
}

export default Post;
