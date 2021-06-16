import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../.././providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import Button from "reactstrap/lib/Button";


export const PostDetail = () => {
  const { getSinglePost, post } = useContext(PostContext);

  const postId = useParams()[0];
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect", postId);
    getSinglePost(postId);
  }, []);

  console.log(post);

  return (
    <Card className="m-4">
      <p className="text-left px-2">
        Posted by: {post.userProfile?.displayName}
      </p>
      {post.publishDateTime != null ? (
        <p className="text-left px-2">Published on: {post.publishDateTime}</p>
      ) : (
        <i className="text-left px-2">Not published</i>
      )}
      <CardImg top src={post.imageLocation} alt={post.title} />
      <CardBody>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>{post.content}</p>

        <p>
          <i>Category: {post.category?.name}</i>
        </p>
        <Button onClick={() => history.push(`/posts/edit/${post.id}`)}>
          Edit Post
        </Button>
      </CardBody>
    </Card>
  );
};

export default PostDetail;
