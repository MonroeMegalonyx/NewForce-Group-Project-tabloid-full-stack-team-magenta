import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    const { getToken } = useContext(UserProfileContext);

    const getPostWithComments = (id) => {
        return getToken().then((token) =>
          fetch(`/api/post/GetPostWithComments/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
        )};

    return (
        <CommentContext.Provider value={{  getPostWithComments  }}>
            {props.children}
        </CommentContext.Provider>
    );
}