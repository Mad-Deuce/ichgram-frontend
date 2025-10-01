import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";

import Menu from "./Menu/Menu";

import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <IchgramLogo className={styles.logo} />
      <Menu />
    </div>
  );
}
