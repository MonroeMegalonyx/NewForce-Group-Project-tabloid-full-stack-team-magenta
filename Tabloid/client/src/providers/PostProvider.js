import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [response, setResponse] = useState(null);
  const { getToken } = useContext(UserProfileContext);

  const getAllPosts = () => {
    return getToken().then((token) =>
      fetch("/api/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPosts)
    );
  };

  const getSinglePost = (id) => {
    return getToken().then((token) =>
      fetch(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPost)
    );
  };

  const getUsersPosts = (id) => {
    return getToken().then((token) =>
      fetch(`/api/post/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPosts)
    );
  };

  const addPost = (post) => {
    return getToken().then((token) =>
      fetch("/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        // get response headers to get ID of newly added post
        .then((response) => {
          for (var pair of response.headers.entries()) {
            // accessing the entries
            if (pair[0] === "location") {
              // key I'm looking for in this instance
               
              setResponse(
                pair[1].split('=')[1] // saving that value where I can use it
              );
            }
          }
          return response.json();
        })
    );
  };
    const deletePost = (id) => {
      return getToken().then((token) =>
      fetch(`/api/post/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(getAllPosts)
    );
  };

  return (
    <PostContext.Provider value={{ posts, post, getAllPosts, getSinglePost, getUsersPosts, addPost, deletePost, response, setResponse, getPostWithComments }}>
      {props.children}
    </PostContext.Provider>
  );
};
