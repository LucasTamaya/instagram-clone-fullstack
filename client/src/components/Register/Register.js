import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";

import registerValidationSchema from "../../helpers/registerValidationSchema";
import { REGISTER_USER } from "../../graphql/mutation";

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

  if (data) {
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit(register)}
      className="flex flex-col bg-gray-100 w-[700px] gap-y-7"
    >
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <input
              type="text"
              value={value || ""}
              className="border border-gray-500"
              placeholder="Enter a username"
              onChange={onChange}
            />
            {/* show error message if error */}
            {!!error && <p className="">{error?.message}</p>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <input
              type="email"
              value={value || ""}
              className="border border-gray-500"
              placeholder="Enter an email address"
              onChange={onChange}
            />
            {/* show error message if error */}
            {!!error && <p className="">{error?.message}</p>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <input
              type="password"
              value={value || ""}
              className="border border-gray-500"
              placeholder="Enter a password"
              onChange={onChange}
            />
            {/* show error message if error */}
            {!!error && <p className="">{error?.message}</p>}
          </>
        )}
      />

      <button type="submit" className="bg-green-500 text-white">
        Register
      </button>
    </form>
  );
}

export default Register;
