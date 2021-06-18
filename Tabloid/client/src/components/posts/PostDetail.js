import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../.././providers/PostProvider";
import { useParams } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export const PostDetail = () => {
  const { getSinglePost, post, deletePost } = useContext(PostContext);
  const history = useHistory();

  const postId = useParams()[0];

  // Get the details of the psot
  useEffect(() => {
    console.log("useEffect", postId);
    getSinglePost(postId);
  }, []);

  // Get the user ID to show delete button
  const loggedInUser = sessionStorage.getItem("userProfile");
  function extractId() {
    var str = loggedInUser;
    var matches = str.match(/\d+/g);
    return matches[0];
  }

  const loggedInUserId = extractId()

  // Delete the post after confirmation if its the user's post
  const handleDelete = () => {
    const r = window.confirm(`Are you sure you want to delete "${post.title}"?`)
    if (r === true) {
      deletePost(post.id)
        .then(() => {
          history.push("/posts")
        })
    }
    else
    {
      history.push(`/posts/details/${postId}`)
    }
  }

  console.log(loggedInUserId)
  console.log(post.userProfile?.id)

  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile?.displayName}</p>
      {post.publishDateTime != null ? <p className="text-left px-2">Published on: {post.publishDateTime}</p> : <i className="text-left px-2">Not published</i>}
      <CardImg top src={post.imageLocation} alt={post.title} />
      <CardBody>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>{post.content}</p>

        <p>
          <i>Category: {post.category?.name}</i>
        </p>
        <button onClick={() => {history.push(`/posts/comments/${post.id}`)}}>View Comments</button>
        {post.userProfile?.id==loggedInUserId ? <button onClick={handleDelete}>Delete this Post</button> : null}
       </CardBody>
    </Card>

  );
};

export default PostDetail;
