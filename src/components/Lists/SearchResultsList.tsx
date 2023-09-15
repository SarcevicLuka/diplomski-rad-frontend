import { useEffect, useState } from "react";
import { User } from "../../pages/auth/types";
import { Chip } from "primereact/chip";
import { useAxios } from "../../api/hooks/useAxios";
import { SearchRoutes } from "../../api/endpoints";
import { TabPanel, TabView } from "primereact/tabview";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { PostResponse } from "./types";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "./PostItem";
import { SearchFormData } from "../forms/types";

interface SearchResultsListProps {
  searchTerm?: SearchFormData;
}

function SearchResultsList({ searchTerm }: SearchResultsListProps) {
  const { axiosInstance } = useAxios();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [pagePosts, setPagePosts] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const handleFetchSearchUsers = () => {
    if (!searchTerm) return;
    axiosInstance
      .get(SearchRoutes.SEARCH_USERS(searchTerm.searchTerm))
      .then((response) => {
        setUsers([]);
        response.data.data.forEach((user: User) => {
          setUsers((current) => [...current, user]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFetchSearchPosts = () => {
    if (!searchTerm) return;
    axiosInstance
      .get(SearchRoutes.SEARCH_POSTS(pagePosts, searchTerm.searchTerm))
      .then((response) => {
        setTotalPosts(response.data.total);
        response.data.data.forEach((post: PostResponse) => {
          setPosts((current) => [...current, post]);
        });
        setPagePosts((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPosts([]);
    setPagePosts(1);
    handleFetchSearchUsers();
    handleFetchSearchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="mt-4">
      <TabView>
        <TabPanel header="Users" rightIcon="pi pi-user ml-2">
          <div className="card flex flex-wrap gap-2">
            {users.length === 0 ? (
              <div>No users found</div>
            ) : (
              users.map((user) => {
                return (
                  <Link to={AvailableRoutes.Account(user.id)} key={user.id}>
                    <Chip
                      label={`${user.firstName} ${user.lastName}`}
                      image={user.avatar}
                    />
                  </Link>
                );
              })
            )}
          </div>
        </TabPanel>
        <TabPanel header="Posts" rightIcon="pi pi-file ml-2">
          {posts.length === 0 ? (
            <div>No posts found</div>
          ) : (
            <InfiniteScroll
              next={() => {
                handleFetchSearchPosts();
              }}
              hasMore={Math.ceil(totalPosts / 5) >= pagePosts}
              loader={<p></p>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>End</b>
                </p>
              }
              dataLength={totalPosts}
              scrollableTarget={"post-card-item"}
            >
              <div
                className="overflow-scroll scroll-container"
                id="post-card-item"
              >
                {posts?.map((data) => {
                  return <PostItem post={data} />;
                })}
              </div>
            </InfiniteScroll>
          )}
        </TabPanel>
      </TabView>
    </div>
  );
}

export default SearchResultsList;
