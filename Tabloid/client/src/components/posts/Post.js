import React from "react";
import { Card, CardBody } from "reactstrap";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";

const Post = ({ post }) => {
  //console.log(post)
  const history = useHistory();

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
      <Button onClick={() => history.push(`/posts/edit/${post.id}`)}>
        Edit Post
      </Button>
    </Card>
  );
};

export default Post;
