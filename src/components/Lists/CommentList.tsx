import { useEffect, useState } from "react";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";
import { ProgressSpinner } from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentResponse } from "./types";
import CommentItem from "./CommentItem";

interface CommentListnProps {
  postId?: string;
  createdComment: number;
}

function CommentList({ postId, createdComment }: CommentListnProps) {
  const { axiosInstance } = useAxios();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const handleFetchPostComments = (pageNum?: number) => {
    if (pageNum) setComments([]);
    axiosInstance
      .get(PostRoutes.POST_COMMENTS(postId!, pageNum ? pageNum : page))
      .then((response) => {
        setTotal(response.data.total);
        response.data.data.forEach((comment: CommentResponse) => {
          setComments((current) => [...current, comment]);
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
    setTimeout(() => {
      handleFetchPostComments(1);
    }, 2000);
    //if (useEffectCalled.current) return;
    //useEffectCalled.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdComment]);

  return isLoading ? (
    <ProgressSpinner />
  ) : (
    <InfiniteScroll
      next={() => {
        handleFetchPostComments();
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
        {comments?.map((data) => {
          return <CommentItem commentData={data} setComments={setComments} />;
        })}
      </div>
    </InfiniteScroll>
  );
}

export default CommentList;
