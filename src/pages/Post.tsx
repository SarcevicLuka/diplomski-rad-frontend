interface PostProps {
  postId: string;
}

function Post({ postId }: PostProps) {
  return <div>{postId}</div>;
}

export default Post;
