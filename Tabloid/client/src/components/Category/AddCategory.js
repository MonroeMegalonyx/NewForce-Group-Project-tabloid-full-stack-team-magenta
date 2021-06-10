import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
export default function CreateCategory() {
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);
    const [categoryName, setCategoryName] = useState();
  
    const submitForm = (e) => {
        e.preventDefault();
        addCategory({ name: categoryName })
          .then(() => history.push("/category"))
          .catch((err) => alert(`An error ocurred: ${err.message}`));
      };
    
      return (
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="categoryName">Category</Label>
            <Input id="categoryName" type="text" placeholder="Please enter the new category name..." onChange={e => setCategoryName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Save</Button>
          </FormGroup>
        </Form>
      );
}