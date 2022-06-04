import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import DeleteModal from "../../DeleteModal/DeleteModal";

function PersonalPost({ postId, imgUrl }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showDeleteModal && (
        <DeleteModal postId={postId} setShowDeleteModal={setShowDeleteModal} />
      )}

      <article
        className="relative w-[200px] h-[200px] max-w-[250px] max-h-[280px] bg-cover bg-center mx-auto"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div
          className="absolute left-0 bottom-0 bg-red-500 p-2 cursor-pointer"
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteIcon sx={{ fontSize: 20 }} className="text-white" />
        </div>
      </article>
    </>
  );
}

export default PersonalPost;
