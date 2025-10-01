import {  Link, useLocation } from "react-router-dom";

import menuItems from "./menuItems.js";

import styles from "./Menu.module.css";

export default function Menu({
  className,
  variant = "",
  toggleModal = () => {},
  hideModal = () => {},
}) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;
  const location = useLocation(); // Get the current location object

  const handleOnClick = (link, title) => {
    if (link) {
      hideModal();
    } else {
      toggleModal(title);
    }
  };

  console.log(location);
  

  const elements = menuItems.map(({ title, icon, link }) => {

    return (
      <li
        key={title}
        className={styles.item}
        onClick={() => handleOnClick(link, title)}
      >
        <Link to={link} className={styles.link}>
          <img src={`/src/assets/icons/${icon}.svg`} className={styles.icon} />
          <p className={styles.title}>{title}</p>
        </Link>
      </li>
    );
  });

  return <ul className={fullClassName}>{elements}</ul>;
}
