import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";


const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="container">
      <Button onClick={() => history.push("/posts/new")}>New Post</Button>

      <div className="row justify-content-center">
        <div className="cards-column">
          {posts
            .sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.publishDateTime) - new Date(a.publishDateTime);
            })
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
