import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/Default";
import Post from "../components/post/Post";

type PostParams = {
  postId: string;
};

function PostPage() {
  const { postId } = useParams<PostParams>();

  return (
    <DefaultLayout>
      <Post postId={postId} />
    </DefaultLayout>
  );
}

export default PostPage;
