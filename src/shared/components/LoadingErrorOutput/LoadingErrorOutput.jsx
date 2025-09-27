import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({ className, loading, error, message }) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;
  return (
    <div className={fullClassName}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {message && <p className={styles.info}>Info: {message}</p>}
    </div>
  );
}
