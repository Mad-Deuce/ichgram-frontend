import { Link } from "react-router-dom";

import styles from "./Card.module.css";

export default function Card({ item = {} }) {
  return (
    <Link to={`/profiles/${item.id}`} className={styles.card}>
        <div className={styles.avatarWrapper}>
          <img src={item.avatar} alt="" className={styles.avatar} />
        </div>
        <span to={`/profiles/${item.id}`} className={styles.username}>
          {item.username}
        </span>
    </Link>
  );
}
