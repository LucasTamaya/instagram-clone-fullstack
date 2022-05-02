import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import instagramLogo from "../../assets/images/logo.png";
import { ADD_POST } from "../../graphql/mutation";

function AddPost() {
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [addPost, { error, loading, data }] = useMutation(ADD_POST);

  // Upload img url to cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lqw1ksez");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dtvjrxnhw/image/upload",
      formData
    )
      .then((res) => {
        console.log(res);
        setImgUrl(res.data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!imgUrl || !description || !localStorage.getItem("id")) {
      console.log("nonnnn");
      return;
    }

    addPost({
      variables: {
        imgUrl,
        description,
        authorId: localStorage.getItem("id"),
      },
    });
  };

  useEffect(() => {
    if (error) {
      setImgUrl("");
      setDescription("");
      alert("something went wrong");
      console.log(error);
    }

    if (data) {
      navigate("/");
    }
  }, [error, data]);

  if (loading) return <p>Loading ...</p>;

  return (
    <div className="flex flex-col items-center">
      <img src={instagramLogo} alt="instagram logo" className="mb-8" />

      <form
        onSubmit={handleAddPost}
        className="flex flex-col items-center gap-y-2 border border-gray-400 p-2"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
        />

        <textarea
          className="border border-black p-1 outline-none"
          cols="30"
          rows="10"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className={`${
            !imgUrl && !description ? "bg-blue-200" : "bg-blue-500"
          } py-1 px-5 text-white rounded`}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
