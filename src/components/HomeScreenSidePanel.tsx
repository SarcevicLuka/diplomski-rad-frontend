import { Button } from "primereact/button";
import HomeScreenFriendsList from "./lists/HomeScreenFriendsList";
import { useNavigate } from "react-router-dom";
import { AvailableRoutes } from "../routes/AvailableRoutes";

interface HomeScreenSidePanelProps {
  isLoggedIn: boolean;
}

function HomeScreenSidePanel({ isLoggedIn }: HomeScreenSidePanelProps) {
  const navigation = useNavigate();

  return isLoggedIn ? (
    <HomeScreenFriendsList />
  ) : (
    <div className="hidden sm:hidden md:block">
      Log in to see your friends
      <div className="flex flex-column align-items-center mx-auto mt-8 max-w-8rem">
        <Button
          label="Login"
          outlined
          className="mb-3"
          onClick={() => navigation(AvailableRoutes.Login)}
        />
        <Button
          label="Register"
          onClick={() => navigation(AvailableRoutes.Register)}
        />
      </div>
    </div>
  );
}

export default HomeScreenSidePanel;
