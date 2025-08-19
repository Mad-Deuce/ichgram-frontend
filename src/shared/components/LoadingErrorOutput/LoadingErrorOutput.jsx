import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({ className, loading, error }) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;
  return (
    <div className={fullClassName}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Login error: {error}</p>}
    </div>
  );
}
