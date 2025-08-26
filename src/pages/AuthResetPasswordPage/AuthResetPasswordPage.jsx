import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from 'react-router-dom';

import AuthResetPasswordForm from "/src/modules/AuthResetPasswordForm/AuthResetPasswordForm";

import { resetPassword, updatePassword } from "/src/redux/auth/auth-thunks";
import { selectAuth } from "/src/redux/auth/auth-selectors";

import styles from "./AuthResetPasswordPage.module.css";

export default function AuthResetPasswordPage() {
  let [searchParams] = useSearchParams();
  const resetToken = searchParams.get('resetToken') ;
  const { loading, error } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleOnSubmitUsernameOrEmail = async (values) => {
    dispatch(resetPassword(values));
  };

  const handleOnSubmitNewPassword = async (values) => {
    dispatch(updatePassword({values, resetToken}));
  };

  return (
    <div className={styles.authResetPasswordPage}>
      <AuthResetPasswordForm
        handleOnSubmitUsernameOrEmail={handleOnSubmitUsernameOrEmail}
        handleOnSubmitNewPassword={handleOnSubmitNewPassword}
        resetToken={resetToken}
        error={error}
        loading={loading}
      />
    </div>
  );
}
