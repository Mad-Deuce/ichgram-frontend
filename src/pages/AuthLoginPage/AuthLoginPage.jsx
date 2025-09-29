import { useSelector, useDispatch } from "react-redux";

import AuthLoginForm from "/src/modules/AuthLoginForm/AuthLoginForm";
import BannerPhone from "/src/shared/components/BannerPhone/BannerPhone";

import { loginUser } from "/src/redux/auth/auth-thunks";
import { selectAuth } from "/src/redux/auth/auth-selectors";

import styles from "./AuthLoginPage.module.css";

export default function AuthLoginPage() {
  const { loading, error, message } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div className={styles.authLoginPage}>
      <div className={styles.gridWrapper}>
        <BannerPhone />
        <AuthLoginForm
          handleOnSubmit={handleOnSubmit}
          error={error}
          loading={loading}
          message={message}
        />
      </div>
    </div>
  );
}
