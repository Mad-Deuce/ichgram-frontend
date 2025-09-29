import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ClosedIcon from "/src/shared/components/icons/ClosedIcon";
import TextField from "/src/shared/components/TextField/TextField";
import Button from "/src/shared/components/Button/Button";
import Divider from "/src/shared/components/Divider/Divider";
import LinkApp from "/src/shared/components/LinkApp/LinkApp";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { fields, defaultValues, emailSchema, passwordSchema } from "./fields";

import styles from "./AuthResetPasswordForm.module.css";

export default function AuthResetPasswordForm({
  handleOnSubmitEmail,
  handleOnSubmitNewPassword,
  error,
  loading,
  message,
  resetToken,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(resetToken ? passwordSchema : emailSchema),
    mode: "onChange",
  });

  const onSubmitEmail = async (values) => {
    handleOnSubmitEmail(values);
    reset();
  };
  const onSubmitNewPassword = async (values) => {
    handleOnSubmitNewPassword(values);
    reset();
  };

  return (
    <div className={styles.authResetPasswordForm}>
      <div className={styles.borderWrapper}>
        <ClosedIcon className={styles.logo} />
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Trouble logging in?</h3>
          <p className={styles.titleText}>
            { resetToken ? "Enter new password" :
              "Enter your email, phone, or username and we'll send you a link to get back into your account."
            }
          </p>
        </div>
        <form
          onSubmit={handleSubmit(
            resetToken ? onSubmitNewPassword : onSubmitEmail
          )}
          className={styles.form}
        >
          {!resetToken && (
            <TextField
              className={styles.input}
              register={register}
              {...fields.email}
              error={errors.email}
            />
          )}
          {resetToken && (
            <>
              <TextField
                className={styles.input}
                register={register}
                {...fields.password}
                error={errors.password}
              />
              <TextField
                className={styles.input}
                register={register}
                {...fields.confirmPassword}
                error={errors.confirmPassword}
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            {resetToken ? "Update password" : "Reset your password"}
          </Button>
          <Divider>OR</Divider>
          <LinkApp to={"/auth/signup"} className={styles.signupLink}>
            Create new account
          </LinkApp>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <LinkApp to={"/auth/login"} className={styles.loginLink}>
          Back to login
        </LinkApp>
      </div>
      <LoadingErrorOutput loading={loading} error={error} message={message}/>
    </div>
  );
}
