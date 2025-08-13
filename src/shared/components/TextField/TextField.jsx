import styles from "./TextField.module.css";

export default function TextField({
  variant = "",
  className = "",
  register = () => {},
  showError = true,
  name,
  error,
  ...props
}) {
  const fullClassName = `${styles.input} ${styles[variant]} ${className}`;

  return (
    <div className={styles.textField}>
      <input {...register(name)} {...props} className={fullClassName} />
      {showError && <p className={styles.error}>{error?.message}</p>}
    </div>
  );
}
