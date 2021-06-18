import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from "react-router-dom";

export default function Comments(comment) {

    return (
      <Card className="m-4">
      <CardBody>
          <p>Subject: {comment.comment.subject}</p>
          <p>"{comment.comment.content}"</p>
          <p>Post by: {comment.comment.userProfile.fullName}</p>
          <p>Date: {comment.comment.createDateTime}</p>
      </CardBody>
    </Card>
    );

}

