import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({
  className,
  loading,
  error,
  message,
}) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;

  return (
    <div className={fullClassName}>
      {Boolean(loading) && <p className={styles.loading}>Loading...</p>}
      {Boolean(error) && <p className={styles.error}>Error: {error}</p>}
      {Boolean(message) && <p className={styles.info}>Info: {message}</p>}
    </div>
  );
}
