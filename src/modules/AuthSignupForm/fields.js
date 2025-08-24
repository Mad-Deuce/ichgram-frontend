import * as yup  from "yup";
import YupPassword from 'yup-password'
YupPassword(yup );

export const defaultValues = {
  email: "",
  fullName: "",
  username: "",
  password: "",
};

export const fields = {
  email: {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  fullName: {
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
  },
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
  }
};


const fullNameRule = {
  regexp: /^[a-zA-Z]+$/,
  message: "Special characters and numbers are not allowed in Full Name",
};

const usernameRule = {
  regexp: /^[a-zA-Z0-9]+$/,
  message: "Special characters are not allowed in Full Name",
};

export const registerSchema = yup .object().shape({
  email: yup .string()
    .trim()
    .required()
    .email(),
  fullName: yup .string()
    .trim()
    .required()
    .min(5)
    .matches(fullNameRule.regexp, fullNameRule.message),
  username: yup .string()
    .trim()
    .required()
    .min(5)
    .matches(usernameRule.regexp, usernameRule.message),
  password: yup .string()
    .password()
});