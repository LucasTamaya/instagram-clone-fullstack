import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";

import { ADD_COMMENT } from "../../graphql/mutation";
import { GET_ALL_POSTS } from "../../graphql/query";

function Post({
  id,
  imgUrl,
  description,
  authorName,
  authorPicture,
  numberOfLikes,
  comments,
}) {
  const [comment, setComment] = useState("");

  const [addComment, { loading, error, data }] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_ALL_POSTS, "getAllPosts"],
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }

    addComment({
      variables: {
        postId: id,
        author: localStorage.getItem("username"),
        text: comment,
      },
    });

    setComment("");
  };

  if (error) {
    console.log(error);
  }

  return (
    <article className="mt-7 w-full h-full max-h-[645px] flex flex-auto flex-col border border-gray-400 max-w-[600px]">
      <div className="flex justify-between items-center p-2 border-b border-gray-400">
        <div className="flex items-center gap-x-4">
          <div className="w-[30px] h-[30px] rounded-3xl border border-gray-300 cursor-pointer flex justify-center items-start">
            {/*a modifier selon la présence d'une photo de profil*/}
            <PermIdentityOutlinedIcon className="text-gray-400" />
          </div>
          <p className="font-bold">{authorName}</p>
        </div>
        <MoreHorizOutlinedIcon className="cursor-pointer" />
      </div>

      <img
        src={imgUrl}
        alt="post image"
        className="min-w-[326px] min-h-[326px] flex-auto max-h-[615px] object-cover bg-red-500"
      />

      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <FavoriteBorderOutlinedIcon className="cursor-pointer" />
          <MapsUgcOutlinedIcon className="cursor-pointer" />
          <SendOutlinedIcon className="cursor-pointer" />
        </div>
        <TurnedInNotOutlinedIcon className="cursor-pointer" />
      </div>

      <div className="p-2 flex items-center gap-x-2">
        <p className="font-bold">{authorName}</p>
        <p className="w-full max-w-[250px] truncate">{description}</p>
      </div>

      {comments && (
        <div className="flex flex-col gap-y-1 p-2">
          {comments.map((comment) => (
            <div className="flex items-center gap-x-2">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="p-2 flex items-center gap-x-4 border-t border-gray-200">
        <TagFacesOutlinedIcon className="cursor-pointer" />
        <form className="w-full flex" onSubmit={handleAddComment}>
          <input
            className="flex-1 outline-none p-1"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={`${
              !comment ? "text-blue-200 cursor-not-allowed" : "text-blue-500"
            } font-bold`}
            type="submit"
          >
            Publish
          </button>
        </form>
      </div>
    </article>
  );
}

export default Post;
