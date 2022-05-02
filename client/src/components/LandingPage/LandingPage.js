import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_ALL_POSTS } from "../../graphql/query";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";

function LandingPage() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network", // cache update when receiving new data
  });

  useEffect(() => {
    if (error) {
      navigate("/register");
    }

    console.log(data);
  }, [error, data]);

  if (loading) {
    console.log("loading")
    // return <p>Loading ...</p>;
  }

  return (
    <div>
      <Header />
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-y-2">
        {data &&
          data.getAllPosts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              imgUrl={post.imgUrl}
              description={post.description}
              authorName={post.author.username}
              authorPicture={post.author.profilPictureUrl}
              numberOfLikes={post.numberOfLikes}
              comments={post.comments}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
