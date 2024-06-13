import React, { useEffect, useState } from "react";
const initialVisibleCount = 20;
const DUMMY_CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam enim, odio culpa iusto natus quisquam alias voluptate dolorum delectus deleniti accusamus quam ad at recusandae error sapiente! Aspernatur, quaerat accusantium?";
const ShowMore = () => {
  const [showMore, setShowMore] = useState(false);
  const [visibleContent, setVisibleContent] = useState("");
  const toggleShowMore = () => {
    // setShowMore(!showMore);
    setShowMore((prev) => !prev);
  };
  useEffect(() => {
    const visibleContent = showMore
      ? DUMMY_CONTENT
      : DUMMY_CONTENT.slice(0, initialVisibleCount);
    setVisibleContent(visibleContent);
  }, [showMore]);
  return (
    <div>
      {visibleContent && visibleContent}
      <button onClick={toggleShowMore}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ShowMore;
