import { useEffect, useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAxios } from "../../api/hooks/useAxios";
import { UserRoutes } from "../../api/endpoints";
import InfiniteScroll from "react-infinite-scroll-component";
import { User } from "../../pages/auth/types";
import UserItem from "./UserItem";
import { Divider } from "primereact/divider";

interface FollowsListProps {
  userId: string;
}

function FollowsList({ userId }: FollowsListProps) {
  const { axiosInstance } = useAxios();
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageFollowing, setPageFollowing] = useState<number>(1);
  const [totalFollowers, setTotalFollowers] = useState<number>(0);
  const [totalFollowing, setTotalFollowing] = useState<number>(0);
  const useEffectCalled = useRef(false);

  const handleFetchFollows = async (page?: number) => {
    axiosInstance
      .get(UserRoutes.USER_FOLLOWS(userId, page))
      .then((response) => {
        console.log("Follows" + response);
        setTotalFollowers(response.data.total);
        response.data.data.forEach((user: User) => {
          setFollowers((current) => [...current, user]);
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setPage((prev) => prev + 1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleFetchFollowing = async (page?: number) => {
    axiosInstance
      .get(UserRoutes.USER_FOLLOWING(userId, page))
      .then((response) => {
        console.log("Following" + response);
        setTotalFollowing(response.data.total);
        response.data.data.forEach((user: User) => {
          setFollowing((current) => [...current, user]);
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setPageFollowing((prev) => prev + 1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (useEffectCalled.current) return;
    useEffectCalled.current = true;
    handleFetchFollows();
    handleFetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <ProgressSpinner />
  ) : (
    <div className="flex">
      <div className="flex-1 flex-column flex align-item-center justify-content-center">
        <div>Following: {totalFollowers} people</div>
        <InfiniteScroll
          next={() => {
            console.log("infinite scroll");
            console.log(page);
            handleFetchFollows(page);
          }}
          hasMore={Math.ceil(totalFollowers / 15) === page}
          loader={<p></p>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End</b>
            </p>
          }
          dataLength={totalFollowers}
          scrollableTarget={"post-card-item"}
        >
          <div className="overflow-scroll scroll-container" id="post-card-item">
            {followers?.map((data) => {
              return <UserItem user={data} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
      <Divider layout="vertical" />
      <div className="flex-1 flex-column flex align-item-center justify-content-center">
        <div className="mb-3">Followers: {totalFollowing} people</div>
        <InfiniteScroll
          next={() => {
            console.log("infinite scroll");
            console.log(pageFollowing);
            handleFetchFollowing(pageFollowing);
          }}
          hasMore={Math.ceil(totalFollowing / 15) === pageFollowing}
          loader={<p></p>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End</b>
            </p>
          }
          dataLength={totalFollowing}
          scrollableTarget={"post-card-item"}
        >
          <div className="overflow-scroll scroll-container" id="post-card-item">
            {following?.map((data) => {
              return <UserItem user={data} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default FollowsList;
