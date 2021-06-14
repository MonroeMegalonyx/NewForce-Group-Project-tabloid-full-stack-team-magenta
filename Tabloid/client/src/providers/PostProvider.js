import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
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

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost, response, setResponse }}>
      {props.children}
    </PostContext.Provider>
  );
};
