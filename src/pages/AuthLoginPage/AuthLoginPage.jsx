import AuthLoginForm from "/src/modules/AuthLoginForm/AuthLoginForm";
import BannerPhone from "/src/shared/components/BannerPhone/BannerPhone";

import styles from "./AuthLoginPage.module.css";

export default function AuthLoginPage() {
  return (
    <div className={styles.authLoginPage}>
      <div class={styles.gridWrapper}>
        <BannerPhone />
        <AuthLoginForm />
      </div>
    </div>
  );
}
