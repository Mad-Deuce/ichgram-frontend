import styles from "./Message.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Message({ message, isMy }) {
  return (
    <div className={`${styles.message} ${isMy && styles.right}`}>
      <div className={styles.avatarWrapper}>
        <img
          src={`${baseURL}/${message.author?.avatar}`}
          alt=""
          className={styles.avatar}
        />
      </div>
      <p className={`${styles.text} ${isMy && styles.right}`}>{message.text}</p>
    </div>
  );
}
