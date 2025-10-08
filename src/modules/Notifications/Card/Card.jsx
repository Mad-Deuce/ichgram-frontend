import { Link } from "react-router-dom";

import { toNotificationFormat } from "/src/shared/utils/dateFormat";

const { VITE_API_URL: baseURL } = import.meta.env;

import styles from "./Card.module.css";

export default function Card({ notification = {} }) {
  let action = "";
  switch (notification.type) {
    case "LIKED":
      action = "liked your post";
      break;
    case "COMMENTED":
      action = "commented your post";
      break;
    case "FOLLOWED":
      action = "started following";
      break;
    default:
      break;
  }

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <Link
          to={`/profiles/${notification.authorUser.id}`}
          className={styles.avatarWrapper}
        >
          <img
            src={`${baseURL}/${notification.authorUser.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </Link>
        <div className={styles.infoWrapper}>
          <Link
            to={`/profiles/${notification.authorUser.id}`}
            className={styles.username}
          >
            {notification.authorUser.username}
          </Link>{" "}
          <span className={styles.action}>{action}</span>
          {". "}
          <span className={styles.date}>
            {toNotificationFormat(notification.updatedAt)}
          </span>
        </div>
      </div>

      {notification.type !== "FOLLOWED" && (
        <Link
          to={`/posts/${notification.targetPost?.id}`}
          className={styles.photoWrapper}
        >
          <img
            src={`${baseURL}/${notification.targetPost?.image}`}
            alt=""
            className={styles.photo}
          />
        </Link>
      )}
    </div>
  );
}
