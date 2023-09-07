import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/Default";
import CustomCard from "../components/CustomCard";
import EditArticleForm from "../components/forms/EditArticleForm";
import { useEffect, useState } from "react";
import { PostRoutes } from "../api/endpoints";
import { PostData } from "../components/post/types";
import { useAxios } from "../api/hooks/useAxios";
import { ProgressSpinner } from "primereact/progressspinner";

type EditPostParams = {
  postId: string;
};

function EditPostPage() {
  const { postId } = useParams<EditPostParams>();
  const { axiosInstance } = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({} as PostData);

  const handleGetPostData = () => {
    setLoading(true);
    axiosInstance
      .get(PostRoutes.USER_POST(postId))
      .then((response) => {
        console.log(response);
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
    handleGetPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <CustomCard title="Edit post">
        {loading ? (
          <ProgressSpinner />
        ) : (
          <EditArticleForm postData={postData} />
        )}
      </CustomCard>
    </DefaultLayout>
  );
}

export default EditPostPage;
