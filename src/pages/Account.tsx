import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../layouts/Default";
import { UserInfo } from "./auth/types";
import { useAxios } from "../api/hooks/useAxios";
import { authRoutes } from "../api/endpoints";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { TabView, TabPanel } from "primereact/tabview";
import PostList from "../components/Lists/PostList";
import { Button } from "primereact/button";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router-dom";
import FollowerList from "../components/Lists/FollowerList";

type AccountParams = {
  userId: string;
};

function Account() {
  const { axiosInstance } = useAxios();
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [followed, setFollowed] = useState<boolean | undefined>(
    userInfo?.amFollowing
  );
  const { userId } = useParams<AccountParams>();

  const handleFollowUser = () => {
    axiosInstance
      .post(authRoutes.FOLLOW_USER(userId!))
      .then((response) => {
        console.log(response);
        setFollowed(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(userId);
    axiosInstance
      .get(authRoutes.USER_ACCOUNT_INFO(userId!))
      .then((response) => {
        const userInfo: UserInfo = response.data;
        const date = new Date(userInfo.userData.createdAt);
        userInfo.userData.createdAt = date.toLocaleDateString();
        setUserInfo(userInfo);
        setFollowed(userInfo.amFollowing);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <div className="md:flex xl:grid mx-2 sm:mt-5 md:mx-8">
        <div className="sm:col-6 md:col-3">
          <div>
            <img src={userInfo?.userData.avatar} alt="User avatar" />
            <table className="mt-3">
              <tbody>
                <tr className="flex align-items-center">
                  <AlternateEmailIcon /> {userInfo?.userData.email}
                </tr>
                <tr className="flex align-items-center mt-3">
                  <EditCalendarIcon /> Joined: {userInfo?.userData.createdAt}
                </tr>
              </tbody>
            </table>
            {token && (
              <Button
                label={followed ? "Unfollow" : "Follow"}
                size="small"
                className="mt-3"
                icon={
                  userInfo?.amFollowing ? "pi pi-user-minus" : "pi pi-user-plus"
                }
                outlined={!followed}
                onClick={() => handleFollowUser()}
              />
            )}
          </div>
        </div>
        <div className="sm:col-12 md:col-9">
          <TabView>
            <TabPanel header="Posts">
              {userInfo?.userData && (
                <PostList userId={userInfo?.userData.id} />
              )}
            </TabPanel>
            <TabPanel header="People">
              {userInfo?.userData && (
                <FollowerList userId={userInfo?.userData.id} />
              )}
            </TabPanel>
          </TabView>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Account;
