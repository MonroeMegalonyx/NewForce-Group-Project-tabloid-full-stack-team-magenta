import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from "react-router-dom";

export default function Category(category) {
  const { categoryId } = useParams();
  const history = useHistory();
  const { deleteCategory } = useContext(CategoryContext);

  const handleDelete = () => {
    const r = window.confirm(`Are you sure you want to delete "${category.category.name}"?`)
    if (r === true) {
      deleteCategory(category.category.id)
        .then(() => {
          history.push("/category")
        })
    }
    else
    {
      history.push("/category")
    }
  }

    return (
      category.category.post.length !== 0 ?
      <Card className="m-4">
      <p className="text-left px-2">{category.category.name}</p>
      <button onClick={() => {history.push(`/category/edit/${category.category.id}`)}}>Edit</button>
    </Card> 
    :   
    <Card className="m-4">
        <p className="text-left px-2">{category.category.name}</p>
        <button onClick={() => {history.push(`/category/edit/${category.category.id}`)}}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </Card>
    );

}

