import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export default function PostWithComments(postId) {
    const history = useHistory();
    const { comment, getPostWithComments } = useContext(CommentContext);

    useEffect(() => {
        getPostWithComments(postId);
    }, []);

    return (
        <Card className="m-4">
          <p className="text-left px-2">Posted by: {comment.userProfile?.displayName}</p>
          {comment.publishDateTime != null ? <p className="text-left px-2">Published on: {comment.publishDateTime}</p> : <i className="text-left px-2">Not published</i>}
          <CardImg top src={comment.imageLocation} alt={comment.title} />
          <CardBody>
           
           </CardBody>
        </Card>
    
      );
}