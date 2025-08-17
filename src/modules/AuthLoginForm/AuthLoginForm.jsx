import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";
import TextField from "/src/shared/components/TextField/TextField";
import Button from "/src/shared/components/Button/Button";
import Divider from "/src/shared/components/Divider/Divider";

import { fields, defaultValues, registerSchema } from "./fields";

import styles from "./AuthLoginForm.module.css";

export default function AuthLoginForm({ handleOnSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });
  return (
    <div className={styles.authLoginForm}>
      <IchgramLogo className={styles.logo} />
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
        <TextField
          className={styles.input}
          register={register}
          {...fields.login}
          error={errors.login}
        />
        <TextField
          className={styles.input}
          register={register}
          {...fields.password}
          error={errors.password}
        />
        <Button variant="contained" className={styles.button}>
          Log in
        </Button>
        <Divider>OR</Divider>
        <Link to={"/auth/reset"} className={styles.link}>Forgot password?</Link>
      </form>
    </div>
  );
}
