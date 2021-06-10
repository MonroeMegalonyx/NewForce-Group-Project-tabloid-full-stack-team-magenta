import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

export default function TagAddForm() {
  const history = useHistory();
  //exposing the addTag function from the TagProdiver
  const { addTag } = useContext(TagContext);
  // setting tagText to an empty state so we can add in the new tag information
  const [tagText, setTagText] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    addTag({ name: tagText })
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="tagText">New Tag</Label>
        <Input
          id="tagText"
          type="text"
          onChange={(e) => setTagText(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button>Save Tag</Button>
      </FormGroup>
    </Form>
  );
}
