import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";

import { DELETE_POST } from "../../../graphql/mutation";
import { GET_MY_POSTS } from "../../../graphql/query";

function PersonalPost({ postId, imgUrl }) {
  const [deletePost, { error, _, data }] = useMutation(DELETE_POST, {
    refetchQueries: [
      {
        query: GET_MY_POSTS,
        variables: { authorId: localStorage.getItem("id") },
      },
    ],
  });

  if (error) {
    console.log(error);
    return <p>{error}</p>;
  }

  return (
    <article
      className="relative w-[200px] h-[200px] max-w-[250px] max-h-[280px] bg-cover bg-center mx-auto"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div
        className="absolute left-0 bottom-0 bg-red-500 p-2 cursor-pointer"
        onClick={() =>
          deletePost({
            variables: { id: postId },
          })
        }
      >
        <DeleteIcon sx={{ fontSize: 20 }} className="text-white" />
      </div>
    </article>
  );
}

export default PersonalPost;
