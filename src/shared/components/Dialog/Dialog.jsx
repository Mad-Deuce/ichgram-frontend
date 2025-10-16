import items from "./items";

import styles from "./Dialog.module.css";

export default function Dialog({
  className,
  setDialogShow,
  deletePost,
  closePost,
}) {
  const fullClassName = `${styles.dialog} ${className}`;

  const handleClick = (action) => {
    setDialogShow(false);
    if (action === "delete") deletePost();
    if (action === "cancel") closePost();
  };

  const elements = items.map((item) => (
    <li key={item.title} className={styles.item}>
      <button
        className={`${styles.btn} ${item.attention && styles.attention}`}
        onClick={() => handleClick(item.action)}
      >
        {item.title}
      </button>
    </li>
  ));

  return <ul className={fullClassName}>{elements}</ul>;
}
