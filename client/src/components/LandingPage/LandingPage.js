import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_ALL_POSTS } from "../../graphql/query";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LandingPost from "../Post/LandingPost/LandingPost";
import LandingPageLoading from "../Loaders/LandingPageLoading/LandingPageLoading";
import Stories from "../Stories/Stories";

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
    return <LandingPageLoading />;
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-y-2 pb-[55px]">
        <Stories />
        {data &&
          data.getAllPosts.map((post) => (
            <LandingPost
              key={post._id}
              postId={post._id}
              imgUrl={post.imgUrl}
              description={post.description}
              authorName={post.author.username}
              authorPicture={post.author.profilPictureUrl}
              like={post.like}
              comments={post.comments}
            />
          ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
