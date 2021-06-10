import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";
import Button from "reactstrap/lib/Button";

export default function TagList() {
  const history = useHistory();
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);


  return (
    <section>
      {tags
        // the sort will show the tags alphabetically
        .sort((a, b) => a.name.localeCompare(b.name))
        //mapping through all tags in the database to display 
        .map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      <Button onClick={() => history.push("/tags/addForm")}>Create Tag</Button>
    </section>
    //button has anonymous onclick function to route to the addForm 
  );
}
