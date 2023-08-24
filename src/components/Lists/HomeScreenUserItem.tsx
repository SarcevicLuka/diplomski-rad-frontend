import { Avatar } from "primereact/avatar";
import { User } from "../../pages/auth/types";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";

interface HomeScreenUserItemProps {
  user: User;
}

function HomeScreenUserItem({ user }: HomeScreenUserItemProps) {
  return (
    <Link
      to={AvailableRoutes.Account(user.id)}
      state={user.id}
      className="flex align-items-center mb-3"
    >
      <Avatar
        image={user.avatar}
        imageAlt="User image"
        size="large"
        shape="circle"
      />
      <div className="ml-3 text-xl">
        <div>{`${user.firstName} ${user.lastName}`}</div>
      </div>
    </Link>
  );
}

export default HomeScreenUserItem;
