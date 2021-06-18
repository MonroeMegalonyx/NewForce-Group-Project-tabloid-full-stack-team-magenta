import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../.././providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import Button from "reactstrap/lib/Button";

export const PostDetail = () => {
  const { getSinglePost, deletePost } = useContext(PostContext);
  const [postState, setPostState] = useState({});

  const postId = useParams()[0];
  const history = useHistory();

  // Get the details of the psot
  useEffect(() => {
    //console.log("useEffect", postId);
    getSinglePost(postId)
    .then(post => {
      setPostState(post)
    })  }, []);

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
    const r = window.confirm(`Are you sure you want to delete "${postState.title}"?`)
    if (r === true) {
      deletePost(postState.id)
        .then(() => {
          history.push("/posts")
        })
    }
    else
    {
      history.push(`/posts/details/${postId}`)
    }
  }

  return (
    <Card className="m-4">
      <p className="text-left px-2">
        Posted by: {postState.userProfile?.displayName}
      </p>
      {postState.publishDateTime != null ? (
        <p className="text-left px-2">Published on: {postState.publishDateTime}</p>
      ) : (
        <i className="text-left px-2">Not published</i>
      )}
      <CardImg top src={postState.imageLocation} alt={postState.title} />
      <CardBody>
        <p>
          <strong>{postState.title}</strong>
        </p>
        <p>{postState.content}</p>

        <p>
          <i>Category: {postState.category?.name}</i>
        </p>
        <Button onClick={() => history.push(`/posts`)}>Return to List</Button>
        <button onClick={() => {history.push(`/posts/comments/${postState.id}`)}}>View Comments</button>
        {postState.userProfile?.id===parseInt(loggedInUserId) ? <Button onClick={() => history.push(`/posts/edit/${postState.id}`)}>Edit this Post</Button> : null}
        {postState.userProfile?.id===parseInt(loggedInUserId) ? <Button onClick={handleDelete}>Delete this Post</Button> : null}
      </CardBody>
    </Card>
  );
};

export default PostDetail;
