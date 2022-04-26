import React from "react";
import queryString from "query-string";

const Posts = (props) => {
  // http://localhost:3000/posts/2018/06?sortBy=name&approved=true
  const queryParam = queryString.parse(props.location.search); // output - {approved: 'true', sortBy: 'name'}

  return (
    <div>
      <h1>Posts</h1>
      Year: {props.match.params.year}, Month: {props.match.params.month}
    </div>
  );
};

export default Posts;
