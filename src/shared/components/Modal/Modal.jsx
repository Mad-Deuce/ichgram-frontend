import styles from "./Modal.module.css";

export default function Modal({
  className,
  variant = "",
  hidden = true,
  children,
}) {
  const fullClassName = `${styles.modal} ${className} ${styles[variant]} ${hidden && styles.hidden}`;
  return (
    <div className={fullClassName} hidden={hidden}>
      {children}
    </div>
  );
}
