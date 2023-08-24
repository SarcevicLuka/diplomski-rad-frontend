interface FollowerListProps {
  userId: string;
}

function FollowerList({ userId }: FollowerListProps) {
  return <div>{userId}</div>;
}

export default FollowerList;
