import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "/src/redux/auth/auth-selectors";

import menuItems from "./menuItems.js";

import styles from "./Menu.module.css";

export default function Menu({
  className,
  variant = "",
  toggleModal = () => {},
  hideModal = () => {},
}) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;
  const user = useSelector(selectUser);

  const handleOnClick = (link, title) => {
    if (link) {
      hideModal();
    } else {
      toggleModal(title);
    }
  };

  const elements = menuItems.map(({ title, icon, link }) => {
    return (
      <li
        key={title}
        className={
          title === "Profile"
            ? `${styles.item} ${styles.profileItem}`
            : styles.item
        }
        onClick={() => handleOnClick(link, title)}
      >
        <Link to={link} className={styles.link}>
          <img
            src={icon ? `/src/assets/icons/${icon}.svg` : user.avatar}
            className={icon ? styles.icon : `${styles.icon} ${styles.avatar}`}
          />
          <p className={styles.title}>{title}</p>
        </Link>
        {!icon && <p className={styles.title}>{user.email}</p>}
      </li>
    );
  });

  return <ul className={fullClassName}>{elements}</ul>;
}
