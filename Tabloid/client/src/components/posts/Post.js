import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const Post = ({ post }) => {
  //console.log(post)
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
    </Card>
  );
};

export default Post;
