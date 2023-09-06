import { useEffect, useContext, useState, useRef } from "react";
import { useAxios } from "../../api/hooks/useAxios";
import { UserRoutes } from "../../api/endpoints";
import { AuthContext } from "../../provider/AuthProvider";
import { User } from "../../pages/auth/types";
import HomeScreenUserItem from "./HomeScreenUserItem";
import { ScrollTop } from "primereact/scrolltop";

function HomeScreenFriendsList() {
  const { user } = useContext(AuthContext);
  const { axiosInstance } = useAxios();
  const [follows, setFollows] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const useEffectCalled = useRef(false);

  const handleGetFollows = () => {
    axiosInstance
      .get(UserRoutes.USER_FOLLOWS(user!.id, 10))
      .then((response) => {
        console.log(response);
        response.data.data.forEach((user: User) => {
          setFollows((current) => [...current, user]);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGetFollowing = () => {
    axiosInstance
      .get(UserRoutes.USER_FOLLOWING(user!.id, 10))
      .then((response) => {
        console.log(response);
        response.data.data.forEach((user: User) => {
          setFollowing((current) => [...current, user]);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (useEffectCalled.current) return;
    useEffectCalled.current = true;

    handleGetFollows();
    handleGetFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hidden md:block">
      <div className="text-xl mb-3">Following: </div>
      <div className="side-panel flex flex-column h-15rem overflow-scroll">
        {follows.length === 0 && <div> You are not following anyone</div>}
        {follows.map((user: User) => {
          return <HomeScreenUserItem user={user} />;
        })}
        <ScrollTop
          target="parent"
          threshold={50}
          className="w-2rem h-2rem border-round-md bg-primary oz"
          icon="pi pi-arrow-up text-base"
        />
      </div>
      <div className="text-xl mb-3">Followers: </div>
      <div className="side-panel flex flex-column h-15rem overflow-scroll">
        {following.length === 0 && <div> You have no followers</div>}
        {following.map((user: User) => {
          return <HomeScreenUserItem user={user} />;
        })}
        <ScrollTop
          target="parent"
          threshold={50}
          className="w-2rem h-2rem border-round-md bg-primary oz"
          icon="pi pi-arrow-up text-base"
        />
      </div>
    </div>
  );
}

export default HomeScreenFriendsList;
