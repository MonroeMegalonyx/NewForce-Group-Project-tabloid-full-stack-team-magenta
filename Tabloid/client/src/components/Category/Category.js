import React, {useContext, useState} from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from "react-router-dom";

export default function Category(category) {
  const history = useHistory();
  const {deleteCategory} = useContext(CategoryContext)


  const handleDelete = () => {
    deleteCategory(category.category.id)
    .then(() => {
      history.push("/category")
    })
  }

    return(
        <Card className="m-4">
      <p className="text-left px-2">{category.category.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </Card>
    );
}
