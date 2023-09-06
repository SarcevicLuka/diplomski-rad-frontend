import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/Default";
import Post from "../components/post/Post";
import { useEffect } from "react";

type PostParams = {
  postId: string;
};

function PostPage() {
  const { postId } = useParams<PostParams>();

  useEffect(() => {
    console.log("Post page");
  }, []);

  return (
    <DefaultLayout>
      <Post postId={postId} />
    </DefaultLayout>
  );
}

export default PostPage;
