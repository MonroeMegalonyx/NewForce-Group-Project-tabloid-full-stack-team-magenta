import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Category from "./Category";

export default function EditCategory() {
    const history = useHistory();
    const { updateCategory, getCategoryById } = useContext(CategoryContext);
    const [editCategory, setEditCategory] = useState({});
    const { categoryId } = useParams();
  
    const submitForm = (e) => {
        e.preventDefault();
        updateCategory(editCategory)
          .then(() => history.push("/category"))
          .catch((err) => alert(`An error ocurred: ${err.message}`));
      };

      useEffect(() => {
        getCategoryById(categoryId)
        .then(category => {
            setEditCategory(category)
        })
        },[])

        const handleControlledInputChange = (event) => {
            const newCategory = {...editCategory }
            newCategory[event.target.id] = event.target.value
           setEditCategory(newCategory) 
          }

      return (
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="name">Edit Category:</Label>
            <Input id="name" value={editCategory.name} type="text" placeholder="Please enter the new category name here..." 
            onChange={handleControlledInputChange} />
          </FormGroup>
          <FormGroup>
            <Button>Save</Button>
            <Button onClick={() => {history.push(`/category`)}}>Cancel</Button>
          </FormGroup>
        </Form>
      );
}