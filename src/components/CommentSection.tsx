import { Divider } from "primereact/divider";
import CreateCommentForm from "./forms/CreateCommentForm";
import CommentList from "./lists/CommentList";

interface CommentSectionProps {
  postId?: string;
}

function CommentSection({ postId }: CommentSectionProps) {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <CreateCommentForm postId={postId} />
      <Divider />
      <CommentList postId={postId} />
    </div>
  );
}

export default CommentSection;
