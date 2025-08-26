import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup);

export const defaultValues = {
  login: "",
  password: "",
  confirmPassword: "",
};

export const fields = {
  login: {
    name: "login",
    type: "text",
    placeholder: "Email or Username",
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
  }
};

export const registerSchema = yup.object({
  login: yup.string()
    .trim()
    .required(),
  password: yup.string()
    .password()
    .required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")])
    .password()
    .required(),
});