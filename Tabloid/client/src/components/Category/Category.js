import React, {useContext, useState} from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from "react-router-dom";

export default function Category(category) {
  const history = useHistory();
  const {updateCategory} = useContext(CategoryContext)

  const handleEdit = () => {
      history.push("/category")
    }
  }

    return(
        <Card className="m-4">
      <p className="text-left px-2">{category.category.name}</p>
      <button onClick={handleEdit}>Edit</button>
    </Card>
    );
}
