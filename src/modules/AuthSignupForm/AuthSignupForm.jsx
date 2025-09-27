import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";
import TextField from "/src/shared/components/TextField/TextField";
import Button from "/src/shared/components/Button/Button";
import LinkApp from "/src/shared/components/LinkApp/LinkApp";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { fields, defaultValues, registerSchema } from "./fields";

import styles from "./AuthSignupForm.module.css";

export default function AuthSignupForm({
  handleOnSubmit,
  error,
  loading,
  message,
}) {
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
    <div className={styles.authSignupForm}>
      <div className={styles.borderWrapper}>
        <IchgramLogo className={styles.logo} />
        <div className={styles.titleWrapper}>
          <p className={styles.title}>Sign up to see photos and videos</p>
          <p className={styles.title}>from your friends.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            className={styles.input}
            register={register}
            {...fields.email}
            error={errors.email}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.fullname}
            error={errors.fullname}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.username}
            error={errors.username}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.password}
            error={errors.password}
          />

          <div className={styles.infoWrapper}>
            <p className={styles.info}>
              People who use our service may have uploaded your contact
              information to Ichgram.&nbsp;
              <LinkApp to={"/learn-more"} className={styles.infoLink}>
                Learn More
              </LinkApp>
            </p>
            <p className={styles.info}>
              By signing up, you agree to our&nbsp;
              <LinkApp to={"/terms"} className={styles.learnMoreLink}>
                Terms
              </LinkApp>
              ,&nbsp;
              <LinkApp to={"/privacy-policy"} className={styles.learnMoreLink}>
                Privacy Policy
              </LinkApp>
              &nbsp;and&nbsp;
              <LinkApp to={"/cookies-policy"} className={styles.learnMoreLink}>
                Cookies Policy
              </LinkApp>
            </p>
          </div>

          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <span className={styles.text}>Have an account? </span>
        <LinkApp to={"/auth/login"} className={styles.signupLink}>
          Log in
        </LinkApp>
      </div>
      <LoadingErrorOutput loading={loading} error={error} message={message} />
    </div>
  );
}
