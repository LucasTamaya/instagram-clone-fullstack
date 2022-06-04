import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CHANGE_PASSWORD } from "../../graphql/mutation";
import Header from "../Header/Header";
import SuccessMessage from "../StatusMessage/SuccessMessage";
import LandingPageLoading from "../Loaders/LandingPageLoading/LandingPageLoading";
import ErrorMessage from "../StatusMessage/ErrorMessage";

function ChangePassword() {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const [changePassword, { loading, error, data }] =
    useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate("/");
      }, [2000]);
    }
  }, [data]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!newPassword || !currPassword) {
      return;
    }

    changePassword({
      variables: {
        id: localStorage.getItem("id"),
        currPassword: currPassword,
        newPassword: newPassword,
      },
    });

    setCurrPassword("");
    setNewPassword("");
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
          data-testid="changePassword"
        >
          {error && <ErrorMessage message="Something went wrong" />}

          {data && <SuccessMessage message="Password successfully changed" />}

          <h2 className="text-xl font-bold">Change your password</h2>

          <form
            className="flex flex-col items-center gap-y-2"
            onSubmit={handleChangePassword}
          >
            <input
              className="outline-none border border-gray-400 p-1"
              type="password"
              value={currPassword}
              minLength={6}
              placeholder="Current password"
              onChange={(e) => setCurrPassword(e.target.value)}
            />
            <input
              className="outline-none border border-gray-400 p-1"
              type="password"
              value={newPassword}
              minLength={6}
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className={`${
                !newPassword ||
                newPassword.length < 2 ||
                !newPassword ||
                newPassword.length < 2
                  ? "bg-blue-200 border border-blue-200 cursor-not-allowed"
                  : "bg-blue-500 border border-blue-500"
              } text-white rounded-tr rounded-br p-1 mr-auto`}
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

export default ChangePassword;
