import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_MY_POSTS } from "../../graphql/query";
import LandingPageLoading from "../Loaders/LandingPageLoading/LandingPageLoading";
import PersonalPost from "../Post/PersonalPost/PersonalPost";

function MyPhotos() {
  const { loading, error, data } = useQuery(GET_MY_POSTS, {
    fetchPolicy: "cache-and-network", // cache update when receiving new data
    variables: { authorId: localStorage.getItem("id") },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (error.message === "Invalid cookie") {
        navigate("/register");
      } else {
        console.log(error);
        return <p>Something went wrong</p>;
      }
    }
  }, [error]);

  if (loading) {
    return <LandingPageLoading />;
  }

  if (data) {
    return (
      <div className="flex flex-col items-center p-4 gap-y-5" data-testid="myPhotos">

        <h2 className="font-bold">My Photos</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.getMyPosts.map((post) => (
            <PersonalPost
              key={post._id}
              postId={post._id}
              imgUrl={post.imgUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyPhotos;
