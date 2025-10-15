import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "/src/redux/auth/auth-selectors";
import { logoutUser } from "/src/redux/auth/auth-thunks";

import menuItems from "./menuItems.js";

import styles from "./Menu.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Menu({
  className,
  variant = "",
  toggleModal = () => {},
  hideModal = () => {},
}) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleOnClick = (link, title) => {
    if (link) {
      hideModal();
    } else {
      toggleModal(title);
    }
  };

  const handleOnLogoutClick = () => {
    dispatch(logoutUser());
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
      </li>
    );
  });

  return (
    <ul className={fullClassName}>
      {elements}
      <Link to={`profile/${user?.id}`} className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <img src={`${baseURL}/${user.avatar}`} className={styles.avatar} />
        </div>

        <p className={styles.title}>Profile</p>
      </Link>
      <button className={styles.logout} onClick={handleOnLogoutClick}>
        <p className={styles.title}>LOGOUT</p>
      </button>
    </ul>
  );
}
