import { Link } from "react-router-dom";

import { toNotificationFormat } from "/src/shared/utils/dateFormat";

import styles from "./Card.module.css";

export default function Card({ item = {} }) {
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <Link to={`/profiles/${item.user.id}`} className={styles.avatarWrapper}>
          <img src={item.user.avatar} alt="" className={styles.avatar} />
        </Link>
        <div className={styles.infoWrapper}>
          <Link to={`/profiles/${item.user.id}`} className={styles.username}>
            {item.user.username}
          </Link>{" "}
          <span className={styles.action}>{item.action}</span>
          {". "}
          <span className={styles.date}>{toNotificationFormat(item.date)}</span>
        </div>
      </div>

      <Link to={`/posts/${item.user.id}`} className={styles.photoWrapper}>
        <img src={item.post.img} alt="" className={styles.photo} />
      </Link>
    </div>
  );
}
