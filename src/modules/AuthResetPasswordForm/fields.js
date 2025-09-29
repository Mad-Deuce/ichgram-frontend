import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup);

import { emailPattern, passwordPattern } from "../AuthSignupForm/fields";

export const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const fields = {
  email: {
    name: "email",
    type: "text",
    placeholder: "Email",
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

export const emailSchema = yup.object({
  email: yup.string()
    .trim()
    .required()
    .matches(emailPattern.regexp, emailPattern.message),
});

export const passwordSchema = yup.object({
  password: yup.string()
    .required()
    .matches(passwordPattern.regexp, passwordPattern.message),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")])
    .required()
    .matches(passwordPattern.regexp, passwordPattern.message),
});