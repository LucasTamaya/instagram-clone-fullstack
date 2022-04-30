import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_ALL_POSTS } from "../../graphql/query";

function LandingPage() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network", // cache update when receiving new data
  });

  useEffect(() => {
    if (error) {
      alert("You don't have the rights to view this page, connect first");
      navigate("/register");
    }
    error ? console.log(error) : console.log(data);
  }, [error, data]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  return <div>Here is the landing page</div>;
}

export default LandingPage;
