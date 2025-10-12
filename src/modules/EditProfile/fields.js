import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup);

export const defaultValues = {
  website: "",
  about: "",
  username: "",
  avatar: null,
};

export const fields = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  website: {
    name: "website",
    type: "text",
    placeholder: "Website",
  },
  about: {
    name: "about",
    type: "textarea",
    placeholder: "Input about text here...",
  },
  avatar: {
    name: "avatar",
    type: "file",
  },
};

const usernamePattern = {
  regexp: /^[a-zA-Z0-9 ]*$/,
  message: "Special characters are not allowed in Username",
};

export const editProfileSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .min(5)
    .max(30)
    .matches(usernamePattern.regexp, usernamePattern.message),
  website: yup.string()
    .trim()
    .max(150),
  about: yup.string()
    .trim()
    .max(150),
  // avatar: yup
  //   .mixed()
  //   .test("required", "Добавьте аватар", (value) => {
  //     console.log(value);
  //     return value && value.size > 0;
  //   }),
});