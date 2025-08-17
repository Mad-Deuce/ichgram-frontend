import * as Yup from "yup";

export const defaultValues = {
  login: "",
  password: "",
};

export const fields = {
  login: {
    name: "login",
    type: "text",
    placeholder: "Username or email",
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
  }
};

export const registerSchema = Yup.object({
  login: Yup.string()
    .trim()
    .required(),
  password: Yup.string()
    .trim()
    .required()
});