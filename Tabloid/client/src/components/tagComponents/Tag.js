import React, { useContext, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import { Popup } from "./TagPopup"

export default function Tag({ tag }) {
    const history = useHistory();
    const { deleteTag } = useContext(TagContext);

    const handleDelete = () => {
        deleteTag(tag.id)
        .then(() => {
            history.push("/tags")
        })
    }

      const [isOpen, setIsOpen] = useState(false);

      const togglePopup = () => {
        setIsOpen(!isOpen);
      };

  return (
    <Card className="m-4">
      <CardBody>
        <strong>{tag.name}</strong>
        <div>
          <input
            type="button"
            value="Delete"
            onClick={togglePopup}
          />
          {isOpen && (
            <Popup
              content={
                <>
                  <b>Are you sure you want to delete this Tag?</b>
                  <p>
                  </p>
                  <button onClick={handleDelete}>Confirm</button>
                  <button onClick={togglePopup}>Cancel</button>
                </>
              }
               handleClose={togglePopup}
            />
          )}
        </div>
      </CardBody>
      {/* <Button onClick={handleDelete}>Delete Tag</Button> */}
    </Card>
  );
}
