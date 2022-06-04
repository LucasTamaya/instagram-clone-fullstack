import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";

import registerValidationSchema from "../../helpers/registerValidationSchema";
import { REGISTER_USER } from "../../graphql/mutation";
import instagramLogo from "../../assets/images/Instagram_logo.svg.png";
import AuthLoading from "../Loaders/AuthLoading/AuthLoading";
import SuccessMessage from "../StatusMessage/SuccessMessage";
import ErrorMessage from "../StatusMessage/ErrorMessage";

function Register() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const [registerUser, { error, loading, data }] = useMutation(REGISTER_USER);

  const register = ({ username, email, password }) => {
    registerUser({
      variables: { username, email, password },
    });
  };

  // Redirect user if no error during the register
  useEffect(() => {
    if (data) {
      localStorage.setItem("id", data.register._id);
      localStorage.setItem("username", data.register.username);
      // Timeout of 3 seconds to see the success message
      setTimeout(() => {
        navigate("/");
      }, [3000]);
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center p-8">
      {data && <SuccessMessage message="Successful connection" />}

      {error && <ErrorMessage message="This user already exists" />}

      <div className="w-full max-w-[350px] border border-gray-400 flex flex-col justify-center items-center gap-y-[10px] p-8">
        <img
          className="w-[150px] "
          src={instagramLogo}
          alt="instagram logo at the top of the form"
        />

        <p className="text-gray-500 font-bold text-center max-w-[270px]">
          Sign up to see photos and videos from your friends.
        </p>

        <form
          onSubmit={handleSubmit(register)}
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
            name="username"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <input
                  type="text"
                  value={value || ""}
                  className="w-full border border-gray-300 rounded py-1 px-2 outline-none focus:border-gray-500 placeholder:text-gray-400"
                  placeholder="Username"
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
            {!loading ? <>Register</> : <AuthLoading />}
          </button>

          <p className="text-gray-400 text-xs text-center">
            By signing up, you agree to our{" "}
            <span className="text-gray-500 font-bold cursor-pointer">
              Terms
            </span>{" "}
            . Learn how we collect, use and share your data in our{" "}
            <span className="text-gray-500 font-bold cursor-pointer">
              Data Policy
            </span>{" "}
            and how we use cookies and similar technology in our{" "}
            <span className="text-gray-500 font-bold cursor-pointer">
              Cookies Policy
            </span>{" "}
            .
          </p>
        </form>
      </div>

      <div className="border border-gray-400 w-full max-w-[350px] py-4">
        <p className="text-center">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
