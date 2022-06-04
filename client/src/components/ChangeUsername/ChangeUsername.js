import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CHANGE_USERNAME } from "../../graphql/mutation";
import Header from "../Header/Header";
import SuccessMessage from "../StatusMessage/SuccessMessage";
import LandingPageLoading from "../Loaders/LandingPageLoading/LandingPageLoading";
import ErrorMessage from "../StatusMessage/ErrorMessage";

function ChangeUsername() {
  const [newUsername, setNewUsername] = useState("");

  const navigate = useNavigate();

  const [changeUsername, { loading, error, data }] =
    useMutation(CHANGE_USERNAME);

  useEffect(() => {
    if (data) {
      localStorage.setItem("username", newUsername);
      setNewUsername("");
      setTimeout(() => {
        navigate("/");
      }, [2000]);
    }
  }, [data]);

  const handleChangeUsername = (e) => {
    e.preventDefault();

    if (!newUsername) {
      return;
    }

    changeUsername({
      variables: {
        id: localStorage.getItem("id"),
        newUsername: newUsername,
      },
    });
  };

  if (loading) {
    return <LandingPageLoading />;
  }

  return (
    <>
      <Header />
      <div className="h-[90vh] flex items-center justify-center">
        <div
          className="flex flex-col items-center p-4 gap-y-5"
          data-testid="changeUsername"
        >
          {error && <ErrorMessage message="Something went wrong" />}

          {data && <SuccessMessage message="Username successfully changed" />}

          <h2 className="text-xl font-bold">Change your username</h2>

          <form
            className="flex flex-col items-center gap-y-2"
            onSubmit={handleChangeUsername}
          >
            <input
              className="outline-none border border-gray-400 p-1"
              type="text"
              value={newUsername}
              minLength={2}
              maxLength={20}
              placeholder="New username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button
              className={`${
                !newUsername || newUsername.length < 2
                  ? "bg-blue-200 border border-blue-200 cursor-not-allowed"
                  : "bg-blue-500 border border-blue-500"
              } text-white mr-auto rounded-tr rounded-br p-1`}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangeUsername;
