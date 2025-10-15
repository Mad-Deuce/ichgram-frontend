import items from "./items";

import styles from "./Dialog.module.css";

export default function Dialog({ className, setDialogShow, deletePost }) {
  const fullClassName = `${styles.dialog} ${className}`;

  const handleClick = () => {
    setDialogShow(false);
    deletePost();
  };

  const elements = items.map((item) => (
    <li className={styles.item}>
      <button
        className={`${styles.btn} ${item.attention && styles.attention}`}
        onClick={handleClick}
      >
        {item.title}
      </button>
    </li>
  ));

  return <ul className={fullClassName}>{elements}</ul>;
}
