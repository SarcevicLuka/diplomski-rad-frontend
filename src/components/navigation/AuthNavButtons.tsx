import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Link, useNavigate } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

function AuthNavButtons() {
  const { token, saveToken, user } = useContext(AuthContext);
  const navigation = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);
    checkIsMobile(); // Initial check

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const avatar = (
    <Avatar image={user?.avatar} className="mx-4" size="large" shape="circle" />
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

  const itemsMobile: MenuItem[] = [
    {
      label: "New Post",
      icon: "pi pi-plus",
      command: () => {
        if (saveToken) saveToken();
        navigation(AvailableRoutes.CreatePost);
      },
    },
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
          {!isMobile && (
            <Link to={AvailableRoutes.CreatePost}>
              <Button label="New Post" icon="pi pi-plus" size="small" />
            </Link>
          )}
          <SplitButton
            className="avatar-button-dropdown"
            label=" "
            icon={avatar}
            model={isMobile ? itemsMobile : items}
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
