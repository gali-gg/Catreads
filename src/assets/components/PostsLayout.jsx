import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import "./css/styles.css";

export const PostsLayout = React.memo(() => {
  const [posts, setPosts] = useState([]);
  const [startNum, setStartNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (posts.length >= 100) {
      setHasMore(false);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${startNum}&_limit=5`)
      .then(resp => resp.json())
      .then(data => setPosts(posts.concat(data)))

    setStartNum(startNum + 5);
  };

  useEffect(() => {
    fetchMoreData()
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <span className="latoR grBlack f-09 text-center">No More Updates</span>
      }
    >
      <Stack spacing={2} sx={{ pl: "25px" }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.userId}
            postText={post.body}
            likes={Math.ceil(Math.random() * 400)}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
});