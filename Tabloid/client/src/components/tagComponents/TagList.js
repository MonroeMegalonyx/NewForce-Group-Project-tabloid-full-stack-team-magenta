import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";

export default function TagList() {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <section>
      {tags.sort((a, b) => a.name.localeCompare(b.name))
        .map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
    </section>
  );
}
