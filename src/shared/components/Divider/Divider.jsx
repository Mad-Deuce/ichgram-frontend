import styles from "./Divider.module.css";

export default function Divider({ className, variant = "", children }) {
  const fullClassName = `${styles.divider} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName}>
      <div className={styles.border}></div>
      <div className={styles.children}>{children}</div>
      <div className={styles.border}></div>
    </div>
  );
}
