import { useContext, useEffect, useRef, useState } from "react";
import { useAxios } from "../../api/hooks/useAxios";
import { authRoutes } from "../../api/endpoints";
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

interface PostProps {
  postId?: string;
}

function Post({ postId }: PostProps) {
  const { axiosInstance } = useAxios();
  const { token } = useContext(AuthContext);
  const useEffectCalled = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>();

  const handleGetPostData = () => {
    setLoading(true);
    axiosInstance
      .get(authRoutes.USER_POST(postId))
      .then((response) => {
        console.log(response.data);
        setPostData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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
                  <div>
                    Author:{" "}
                    {`${postData.creator.firstName} ${postData.creator.lastName}`}
                  </div>
                  <div>
                    Posted: {convertToLocaleDate(postData.post.updatedAt)}
                  </div>
                </div>
              </div>
              <div>
                <Button
                  label="4"
                  icon="pi pi-heart"
                  rounded
                  text
                  raised
                  disabled={token ? false : true}
                  severity="help"
                  aria-label="Favorite"
                  tooltip="Like post"
                  tooltipOptions={{ position: "bottom" }}
                />
              </div>
            </div>
          </div>
          <div className="review mt-4">
            <div className="text-lg font-medium">Review:</div>
            <div className="text-lg">{parse(postData.post.text)}</div>
          </div>
          <WatchDetailsTable watchDetails={postData.watchData} />
          <ImageGalleria images={postData.watchImages} />
        </div>
      </CustomCard>
    )
  );
}

export default Post;
