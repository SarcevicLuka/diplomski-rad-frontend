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
      <div className="flex align-items-center justify-content-between">
        <Link to={AvailableRoutes.Account(user.id)} reloadDocument>
          <div className="flex align-items-center">
            <Avatar image={user.avatar} size="xlarge" shape="circle" />
            <div className="flex flex-column ml-5">
              <div className="text-2xl">
                <div>{`${user.firstName} ${user.lastName}`}</div>
              </div>
              <div>Joined: {convertToLocaleDate(user.createdAt)}</div>
            </div>
          </div>
        </Link>
      </div>
      <Divider />
    </>
  );
}

export default UserItem;
