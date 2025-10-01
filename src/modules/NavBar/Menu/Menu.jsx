import { NavLink } from "react-router-dom";

import menu from "./menu";

import styles from "./Menu.module.css";

export default function Menu({ className, variant = "" }) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;

  const elements = menu.map(({ title }) => {
    return (
      <li key={title} className={styles.item}>
        <NavLink>
          
        </NavLink>
      </li>
    );
  });

  return <ul className={fullClassName}>Menu {elements}</ul>;
}
