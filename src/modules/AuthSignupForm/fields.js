import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup);

export const defaultValues = {
  email: "",
  fullname: "",
  username: "",
  password: "",
};

export const fields = {
  email: {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  fullname: {
    name: "fullname",
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


const fullnamePattern = {
  regexp: /^[a-zA-Z ]*$/,
  message: "Special characters and numbers are not allowed in Full Name",
};

const usernamePattern = {
  regexp: /^[a-zA-Z0-9 ]*$/,
  message: "Special characters are not allowed in Full Name",
};

export const emailPattern = {
  regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "Please enter a valid email address.",
};

export const passwordPattern = {
  regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/,
  message: "Password must contain at least one uppercase letter, one lowercase letter, numeric character, one special character",
};

export const registerSchema = yup.object().shape({
  email: yup.string()
    .trim()
    .required()
    .matches(emailPattern.regexp, emailPattern.message),
  fullname: yup.string()
    .trim()
    .max(30)
    .matches(fullnamePattern.regexp, fullnamePattern.message),
  username: yup.string()
    .trim()
    .max(30)
    .matches(usernamePattern.regexp, usernamePattern.message),
  password: yup.string()
    .matches(passwordPattern.regexp, passwordPattern.message)
    .required(),
});