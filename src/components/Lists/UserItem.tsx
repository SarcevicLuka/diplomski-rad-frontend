import { User } from "../../pages/auth/types";

interface UserItem {
  user: User;
}

function UserItem({ user }: UserItem) {
  return <div>{user.firstName}</div>;
}

export default UserItem;
