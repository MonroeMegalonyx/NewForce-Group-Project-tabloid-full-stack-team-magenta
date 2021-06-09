import React, { useState, useContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export function TagProvider(props){
  const apiUrl = "/api/tag";

  const { getToken } = useContext(UserProfileContext);

  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return getToken().then((token) =>
      fetch("/api/tag", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setTags)
    );
  };

  const addTag = (tag) => {
    return getToken().then((token) =>
    fetch("/api/tag", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }));
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getAllTags,
        addTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
}