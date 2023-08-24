import { useEffect, useRef, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAxios } from "../../api/hooks/useAxios";
import { authRoutes } from "../../api/endpoints";
import InfiniteScroll from "react-infinite-scroll-component";
import { User } from "../../pages/auth/types";
import UserItem from "./UserItem";

interface PeopleListProps {
  userId: string;
}

function PeopleList({ userId }: PeopleListProps) {
  const { axiosInstance } = useAxios();
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalFollowers, setTotalFollowers] = useState<number>(0);
  const [totalFollowing, setTotalFollowing] = useState<number>(0);
  const useEffectCalled = useRef(false);

  const handleFetchPosts = async (page?: number) => {
    axiosInstance
      .get(authRoutes.USER_FOLLOWS(userId, page))
      .then((response) => {
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

  useEffect(() => {
    if (useEffectCalled.current) return;
    useEffectCalled.current = true;
    handleFetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <ProgressSpinner />
  ) : (
    <InfiniteScroll
      next={() => {
        console.log("infinite scroll");
        console.log(page);
        handleFetchPosts(page);
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
  );
}

export default PeopleList;
