import React from "react";
import { Card, CardBody } from "reactstrap";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";

const Post = ({ post }) => {

  //console.log(post)
  const history = useHistory();

  // Get the user ID to show delete button
  const loggedInUser = sessionStorage.getItem("userProfile");
  function extractId() {
    var str = loggedInUser;
    var matches = str.match(/\d+/g);
    return matches[0];
  }

  const loggedInUserId = extractId()

  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.fullName}</p>
      <CardBody>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>Category: {post.category.name}</p>
      </CardBody>
      <p className="text-left px-2">Published: {post.publishDateTime}</p>
      <Button onClick={() => history.push(`/posts/details/${post.id}`)}>
        Read Post
      </Button>
      {post.userProfile?.id===parseInt(loggedInUserId) ? <Button onClick={() => history.push(`/posts/edit/${post.id}`)}>Edit this Post</Button> : null}
    </Card>
  );
};

export default Post;
