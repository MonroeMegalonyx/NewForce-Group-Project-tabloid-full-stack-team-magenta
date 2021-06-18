import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";
import { Button, Card, CardImg, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import Comments from "./Comment"

export default function PostComments() {
  const history = useHistory();
  const { getPostWithComments } = useContext(CommentContext);
  const [post, setPost] = useState({});
  const { postId } = useParams();


  useEffect(() => {
    getPostWithComments(postId)
      .then(post => {
        setPost(post)
      })
  }, []);

  return (
    post.comments?.length !== 0 ?
      <div>
        <h2 className="text-left px-2">Post: "{post.title}"</h2>
        <h6>Comments:</h6>
        <div className="m-4">
          {post.comments?.sort((a, b) => a.createDateTime - b.createDateTime).map(comment =>
            <>
              <Comments key={comment.id} comment={comment} />
            </>)}
        </div>
        <Button onClick={() => { history.push(`/posts/details/${postId}`) }}>Back</Button>
      </div>
      :
      <div>
        <h2 className="text-left px-2">Post: "{post.title}"</h2>
        <div></div>
        <h6>No Comments</h6>
        <Button onClick={() => { history.push(`/posts/details/${postId}`) }}>Back</Button>
      </div>
  );
}