import { useSelector, useDispatch } from "react-redux";

import AuthResetPasswordForm from "/src/modules/AuthResetPasswordForm/AuthResetPasswordForm";

import { loginUser } from "/src/redux/auth/auth-thunks";
import { selectAuth } from "/src/redux/auth/auth-selectors";

import styles from "./AuthResetPasswordPage.module.css";

export default function AuthResetPasswordPage() {
  const { loading, error, tempToken } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleOnSubmitUsernameOrEmail = async (values) => {
    dispatch(loginUser(values));
  };
  const handleOnSubmitNewPassword = async (values) => {
    console.log(values);
  };

  return (
    <div className={styles.authResetPasswordPage}>
      <AuthResetPasswordForm
        handleOnSubmitUsernameOrEmail={handleOnSubmitUsernameOrEmail}
        handleOnSubmitNewPassword={handleOnSubmitNewPassword}
        tempToken={tempToken}
        error={error}
        loading={loading}
      />
    </div>
  );
}
