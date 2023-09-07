import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/Default";

type EditPostParams = {
  postId: string;
};

function EditPostPage() {
  const { postId } = useParams<EditPostParams>();

  return (
    <DefaultLayout>
      <div>Edit post {postId}</div>
    </DefaultLayout>
  );
}

export default EditPostPage;
