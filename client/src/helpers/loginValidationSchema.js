import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("Please enter your password"),
}).required();

export default loginValidationSchema;
