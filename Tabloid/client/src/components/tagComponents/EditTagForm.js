import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../.././providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const EditTagForm = () => {
    const { getSingleTag, editTag, getAllTags } = useContext(TagContext);

    const history = useHistory();

    const tagId = useParams()[0];

    const[singleTag, setSingleTag] = useState({

        name: ""
    })

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    getSingleTag(tagId)
    .then(tag => {
    setSingleTag(tag)
    setIsLoading(false)
 })
            
            }, [])


      const submitForm = (e) => {
        e.preventDefault();
        editTag(singleTag)
          .then(() => history.push("/tags"))
          .catch((err) => alert(`An error ocurred: ${err.message}`));
      };
      

    return (
      <>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="tagText">Edit Tag: </Label>
            <Input
              id="name"
              type="text"
              value={singleTag.name}
              onChange={(e) => {
                const state = { ...singleTag };
                state[e.target.id] = e.target.value;
                setSingleTag(state);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={isLoading}>Save Tag</Button>
          </FormGroup>
          <FormGroup>
            <Button onClick={() => history.push("/tags")}>Cancel</Button>
          </FormGroup>
        </Form>
      </>
    );
};

export default EditTagForm;