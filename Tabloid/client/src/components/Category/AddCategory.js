import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";

export default function CategoryList() {
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
            <Input id="categoryName" type="textarea" onChange={e => setCategoryName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Save</Button>
          </FormGroup>
        </Form>
      );
}