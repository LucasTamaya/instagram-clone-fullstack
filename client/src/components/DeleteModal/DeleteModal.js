import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";

import { DELETE_POST } from "../../graphql/mutation";
import { GET_MY_POSTS } from "../../graphql/query";

function DeleteModal({ postId, setShowDeleteModal }) {
  const [deletePost, { error, _, data }] = useMutation(DELETE_POST, {
    refetchQueries: [
      {
        query: GET_MY_POSTS,
        variables: { authorId: localStorage.getItem("id") },
      },
    ],
  });

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/40 overflow-hidden z-10 p-5"
      data-testid="deleteModal"
    >
      <div className="flex flex-col gap-y-7 w-full max-w-[450px] bg-white rounded p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Delete Photo</h3>
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setShowDeleteModal(false)}
          />
        </div>

        <p>Are you sure you want to delete this photo?</p>

        <div className="flex justify-between items-center">
          <button
            className="py-2 px-3 border border-blue-500 text-blue-500 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-3 bg-red-500 text-white rounded"
            onClick={() =>
              deletePost({
                variables: { id: postId },
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
