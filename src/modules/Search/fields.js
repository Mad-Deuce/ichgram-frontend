import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup);

export const defaultValues = {
  username: "",
};

export const fields = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Search",
  },
};




const usernamePattern = {
  regexp: /^[a-zA-Z0-9 ]*$/,
  message: "Special characters are not allowed in Full Name",
};



export const registerSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .min(3)
    .max(30)
    .matches(usernamePattern.regexp, usernamePattern.message),
});