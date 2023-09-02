import { useEffect, useRef, useState } from "react";
import { PostResponse } from "./types";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";
import { ProgressSpinner } from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "./PostItem";

interface HomeScreenPostListProps {
  searchTerm: string;
}

function HomeScreenPostList({ searchTerm }: HomeScreenPostListProps) {
  const { axiosInstance } = useAxios();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const useEffectCalled = useRef(false);

  const handleFetchFeedPosts = async (page?: number) => {
    axiosInstance
      .get(PostRoutes.FEED_POSTS(searchTerm, page))
      .then((response) => {
        console.log(response);
        setTotal(response.data.total);
        response.data.data.forEach((post: PostResponse) => {
          setPosts((current) => [...current, post]);
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
    console.log("Use effect");
    if (useEffectCalled.current) return;
    useEffectCalled.current = true;
    handleFetchFeedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <ProgressSpinner />
  ) : (
    <InfiniteScroll
      next={() => {
        console.log("infinite scroll");
        console.log(page);
        handleFetchFeedPosts(page);
      }}
      hasMore={Math.ceil(total / 15) === page}
      loader={<p></p>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>End</b>
        </p>
      }
      dataLength={total}
      scrollableTarget={"post-card-item"}
    >
      <div className="overflow-scroll scroll-container" id="post-card-item">
        {posts?.map((data) => {
          return <PostItem post={data} />;
        })}
      </div>
    </InfiniteScroll>
  );
}

export default HomeScreenPostList;
