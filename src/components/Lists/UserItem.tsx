import { Link } from "react-router-dom";
import { User } from "../../pages/auth/types";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Avatar } from "primereact/avatar";
import { convertToLocaleDate } from "../../utils/dateTimeConverter";
import { Divider } from "primereact/divider";

interface UserItem {
  user: User;
}

function UserItem({ user }: UserItem) {
  return (
    <>
      <Link to={AvailableRoutes.Account(user.id)} reloadDocument>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center">
            <Avatar image={user.avatar} size="large" shape="circle" />
            <div className="ml-3 text-xl">
              <div>{`${user.firstName} ${user.lastName}`}</div>
            </div>
            <div>{convertToLocaleDate(user.createdAt)}</div>
          </div>
        </div>
      </Link>
      <Divider />
    </>
  );
}

export default UserItem;
