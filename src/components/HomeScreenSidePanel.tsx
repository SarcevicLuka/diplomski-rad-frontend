import HomeScreenFriendsList from "./Lists/HomeScreenFriendsList";

interface HomeScreenSidePanelProps {
  isLoggedIn: boolean;
}

function HomeScreenSidePanel({ isLoggedIn }: HomeScreenSidePanelProps) {
  return isLoggedIn ? <HomeScreenFriendsList /> : <div>Not logged in</div>;
}

export default HomeScreenSidePanel;
