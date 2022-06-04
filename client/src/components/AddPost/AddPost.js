import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DoneIcon from "@mui/icons-material/Done";

import instagramLogo from "../../assets/images/logo.png";
import Header from "../Header/Header";
import { ADD_POST } from "../../graphql/mutation";
import UploadPhotoLoading from "../Loaders/UploadPhotoLoading/UploadPhotoLoading";

function AddPost() {
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploadToCloudinaryLoading, setUploadToCloudinaryLoading] =
    useState(false);

  const navigate = useNavigate();

  const [addPost, { error, loading, data }] = useMutation(ADD_POST);

  // Upload img url to cloudinary
  const uploadToCloudinary = async (file) => {
    setUploadToCloudinaryLoading(true);
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
        setUploadToCloudinaryLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!imgUrl || !description || !localStorage.getItem("id")) {
      console.log("data manquante");
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
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-y-5 p-5 h-screen">
        <img src={instagramLogo} alt="instagram logo" />

        <h2 className="font-bold">Create a new publication</h2>

        <form
          onSubmit={handleAddPost}
          className="w-full flex flex-col items-center gap-y-5 p-2"
        >
          <label
            htmlFor="inputFile"
            className="flex flex-col justify-center items-center border border-gray-400 w-[250px] h-[150px] cursor-pointer"
          >
            {!uploadToCloudinaryLoading && !imgUrl && (
              <>
                <AddAPhotoIcon className="text-gray-400" />
                <span className="text-sm text-gray-400">Add a photo</span>
              </>
            )}

            {uploadToCloudinaryLoading && <UploadPhotoLoading />}

            {imgUrl && (
              <>
                <span className="text-blue-500 font-bold mb-2">
                  Photo selected
                </span>
                <div className="p-2 border-2 border-blue-500 rounded-full">
                  <DoneIcon className="text-blue-500" />
                </div>
              </>
            )}
          </label>
          <input
            id="inputFile"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => uploadToCloudinary(e.target.files[0])}
          />

          <textarea
            className="border border-gray-400 w-[250px] h-[250px] p-1 outline-none resize-none"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="w-[250px] flex justify-evenly">
            <button
              type="submit"
              className={`${
                imgUrl && description
                  ? "bg-blue-500"
                  : "bg-blue-200 cursor-not-allowed"
              } py-1 px-5 text-white rounded`}
            >
              Post
            </button>
            <button
              className="text-blue-500 py-1 px-5 border border-blue-600 rounded"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPost;
