import * as Yup from "yup";

const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "This username is too short")
    .required("Please enter your username"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("Please enter your password"),
}).required();

export default registerValidationSchema;
