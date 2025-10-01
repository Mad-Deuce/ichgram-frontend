import styles from "./MainGrid.module.css";

export default function MainGrid({ className, variant = "", children }) {
  const fullClassName = `${styles.mainGrid} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>{children}</div>;
}
