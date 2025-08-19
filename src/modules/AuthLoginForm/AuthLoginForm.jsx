import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";
import TextField from "/src/shared/components/TextField/TextField";
import Button from "/src/shared/components/Button/Button";
import Divider from "/src/shared/components/Divider/Divider";
import LinkApp from "/src/shared/components/LinkApp/LinkApp";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { fields, defaultValues, registerSchema } from "./fields";

import styles from "./AuthLoginForm.module.css";

export default function AuthLoginForm({ handleOnSubmit, error, loading }) {
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

  const onSubmit = async (values) => {
    handleOnSubmit(values);
    reset();
  };

  return (
    <div className={styles.authLoginForm}>
      <div className={styles.borderWrapper}>
        <IchgramLogo className={styles.logo} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Log in
          </Button>
          <Divider>OR</Divider>
          <LinkApp to={"/auth/reset"} className={styles.resetLink}>
            Forgot password?
          </LinkApp>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <span className={styles.text}>Don't have an account? </span>
        <LinkApp to={"/auth/signup"} className={styles.signupLink}>
          Sign up?
        </LinkApp>
      </div>
      <LoadingErrorOutput loading={loading} error={error} />
    </div>
  );
}
