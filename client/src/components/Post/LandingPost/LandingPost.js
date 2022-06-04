import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import { v4 } from "uuid";

import { ADD_COMMENT } from "../../../graphql/mutation";
import { LIKE_POST } from "../../../graphql/mutation";
import { UNLIKE_POST } from "../../../graphql/mutation";

function LandingPost({
  postId,
  imgUrl,
  description,
  authorName,
  authorPicture,
  like,
  comments,
}) {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const [arrayOfLikes, setArrayOfLikes] = useState(like);
  const [myLike, setMyLike] = useState(false);

  useEffect(() => {
    // verify if the user liked the post at it first load
    if (arrayOfLikes.includes(localStorage.getItem("id"))) {
      setMyLike(true);
    }
  }, []);

  useEffect(() => {
    if (!myLike) {
      unlikePost({
        variables: {
          postId,
          arrayOfLikes: arrayOfLikes,
        },
      });
    }

    if (myLike) {
      likePost({
        variables: {
          postId,
          arrayOfLikes: arrayOfLikes,
        },
      });
    }
  }, [arrayOfLikes]);

  const [addComment] = useMutation(ADD_COMMENT);
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment) {
      return;
    }

    addComment({
      variables: {
        postId,
        author: localStorage.getItem("username"),
        text: newComment,
      },
      onError: () => alert("something went wrong when adding comment"),
    });

    setAllComments((curr) => [
      ...curr,
      { author: localStorage.getItem("username"), text: newComment },
    ]);

    setNewComment("");
  };

  const handleLikePost = (e) => {
    e.preventDefault();
    setArrayOfLikes((curr) => [...curr, localStorage.getItem("id")]);
    setMyLike(true);
  };

  const handleUnlikePost = (e) => {
    e.preventDefault();
    setArrayOfLikes((curr) =>
      [...curr].filter((id) => id !== localStorage.getItem("id"))
    );
    setMyLike(false);
  };

  return (
    <article className="mt-5 mx-auto w-full h-full max-h-[645px] max-w-[600px] flex flex-auto flex-col border border-gray-400 lg:mx-0">
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
        alt="instagram post"
        className="min-w-[326px] min-h-[326px] flex-auto max-h-[615px] object-cover"
      />

      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <div className="relative cursor-pointer">
            <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
            {!myLike ? (
              <FavoriteBorderOutlinedIcon onClick={handleLikePost} />
            ) : (
              <FavoriteIcon
                className="text-red-500"
                onClick={handleUnlikePost}
              />
            )}
          </div>
          <MapsUgcOutlinedIcon className="cursor-pointer" />
          <SendOutlinedIcon className="cursor-pointer" />
        </div>
        <TurnedInNotOutlinedIcon className="cursor-pointer" />
      </div>

      {arrayOfLikes.length === 0 ? (
        <></>
      ) : arrayOfLikes.length === 1 ? (
        <span className="font-bold py-1 px-2">{arrayOfLikes.length} like</span>
      ) : (
        <span className="font-bold py-1 px-2">{arrayOfLikes.length} likes</span>
      )}

      <div className="p-2 flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <p className="font-bold">{authorName}</p>
          <p className="w-full max-w-[250px] truncate">{description}</p>
        </div>

        {allComments && (
          <div className="flex flex-col gap-y-1">
            {allComments.map((comment) => (
              <div key={v4()} className="flex items-center gap-x-2">
                <p className="font-bold">{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 flex items-center gap-x-4 border-t border-gray-200">
        <TagFacesOutlinedIcon className="cursor-pointer" />
        {/* Add a comment */}
        <form className="w-full flex" onSubmit={handleAddComment}>
          <input
            className="flex-1 outline-none p-1"
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className={`${
              !newComment ? "text-blue-200 cursor-not-allowed" : "text-blue-500"
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

export default LandingPost;
