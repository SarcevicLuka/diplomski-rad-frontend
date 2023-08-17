import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Link, useNavigate } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

function AuthNavButtons() {
  const { token, saveToken } = useContext(AuthContext);
  const navigation = useNavigate();

  const avatar = (
    <Avatar
      image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
      className="mx-4"
      size="large"
      shape="circle"
    />
  );

  const items: MenuItem[] = [
    {
      label: "Account",
      icon: "pi pi-user",
      command: () => navigation(AvailableRoutes.Account),
    },
    {
      label: "Log Out",
      icon: "pi pi-sign-out",
      command: () => {
        if (saveToken) saveToken();
        navigation(AvailableRoutes.Home);
      },
    },
  ];

  return (
    <div className="flex justify-content-center align-items-center sm:mr-0 md:mr-4">
      {token ? (
        <>
          <Link to={AvailableRoutes.CreatePost}>
            <Button label="New Post" icon="pi pi-plus" size="small" />
          </Link>
          <SplitButton
            className="avatar-button-dropdown"
            label=" "
            icon={avatar}
            model={items}
            text
            size="small"
          />
        </>
      ) : (
        <>
          <Link to={AvailableRoutes.Login}>
            <Button label="Login" link />
          </Link>
          <Link to={AvailableRoutes.Register}>
            <Button label="Register" size="small" />
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthNavButtons;