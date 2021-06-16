import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    const { getToken } = useContext(UserProfileContext);
    const [comment, setComment] = useState([]);

    const getPostWithComments = (id) => {
        return getToken().then((token) =>
          fetch(`/api/post/GetWithComments/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then(setComment)
        );
      };

    return (
        <CategoryContext.Provider value={{ comment, getPostWithComments  }}>
            {props.children}
        </CategoryContext.Provider>
    );
}