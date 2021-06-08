import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";

export default function CategoryList() {
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);
    const [category, setCategory] = useState();
  
    const submitForm = (e) => {
        e.preventDefault();
        addCategory({ text: quoteText })
          .then(() => history.push("/"))
          .catch((err) => alert(`An error ocurred: ${err.message}`));
      };
    
      return (
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="quoteText">Quote</Label>
            <Input id="quoteText" type="textarea" onChange={e => setQuoteText(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Save</Button>
          </FormGroup>
        </Form>
      );
}