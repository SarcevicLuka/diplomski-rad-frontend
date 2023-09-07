import { Divider } from "primereact/divider";
import CreateCommentForm from "./forms/CreateCommentForm";
import CommentList from "./lists/CommentList";
import { useState } from "react";

interface CommentSectionProps {
  postId?: string;
}

function CommentSection({ postId }: CommentSectionProps) {
  const [createdComment, setCreatedComment] = useState<number>(0);

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <CreateCommentForm
        setCreatedComment={setCreatedComment}
        postId={postId}
      />
      <Divider />
      <CommentList createdComment={createdComment} postId={postId} />
    </div>
  );
}

export default CommentSection;
