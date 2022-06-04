import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";

import loginValidationSchema from "../../helpers/loginValidationSchema";
import { LOGIN_USER } from "../../graphql/mutation";
import instagramLogo from "../../assets/images/Instagram_logo.svg.png";
import AuthLoading from "../Loaders/AuthLoading/AuthLoading";
import SuccessMessage from "../StatusMessage/SuccessMessage";
import ErrorMessage from "../StatusMessage/ErrorMessage";

function Login() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const [logUser, { error, loading, data }] = useMutation(LOGIN_USER); // AJOUTER LA GESTION DERREUR

  const log = ({ email, password }) => {
    logUser({
      variables: { email, password },
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("id", data.login._id);
      localStorage.setItem("username", data.login.username);
      // Timeout of 3 seconds to see the success message
      setTimeout(() => {
        navigate("/");
      }, [3000]);
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center p-8">
      {data && <SuccessMessage message="Successful connection" />}

      {error && <ErrorMessage message="Invalid email or password" />}

      <div className="w-full max-w-[350px] border border-gray-400 flex flex-col justify-center items-center gap-y-[10px] p-8">
        <img
          className="w-[150px] "
          src={instagramLogo}
          alt="instagram logo at the top of the form"
        />

        <form
          onSubmit={handleSubmit(log)}
          className="flex flex-col w-full max-w-[260px] gap-y-7"
          role="form"
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <input
                  type="email"
                  value={value || ""}
                  className="w-full border border-gray-300 rounded py-1 px-2 outline-none focus:border-gray-500 placeholder:text-gray-400"
                  placeholder="Email"
                  onChange={onChange}
                />
                {/* show error message if error */}
                {!!error && (
                  <p className="text-xs text-red-500">{error?.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <input
                  type="password"
                  value={value || ""}
                  className="w-full border border-gray-300 rounded py-1 px-2 outline-none focus:border-gray-500 placeholder:text-gray-400"
                  placeholder="Password"
                  onChange={onChange}
                />
                {/* show error message if error */}
                {!!error && (
                  <p className="text-xs text-red-500">{error?.message}</p>
                )}
              </div>
            )}
          />

          <button
            className="text-white h-[35px] flex justify-center items-center py-2 rounded bg-blue-500"
            type="submit"
          >
            {!loading ? <>Log In</> : <AuthLoading />}
          </button>
        </form>
      </div>

      <div className="border border-gray-400 w-full max-w-[350px] py-4">
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
