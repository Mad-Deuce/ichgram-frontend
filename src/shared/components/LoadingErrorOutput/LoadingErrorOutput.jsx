import { useEffect, useState } from "react";

import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({
  className,
  loading,
  error,
  message,
  render,
  timeout = 5000,
}) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;

  const [localMessage, setLocalMessage] = useState(message);

  useEffect(() => {
    setLocalMessage(message);
    if (!message) return;
    const t = setTimeout(() => {
      setLocalMessage(null);
    }, timeout);
    return () => clearTimeout(t);
  }, [message, render, timeout]);

  return (
    <div className={fullClassName}>
      {Boolean(loading) && <p className={styles.loading}>Loading...</p>}
      {Boolean(error) && <p className={styles.error}>Error: {error}</p>}
      {Boolean(localMessage) && (
        <p className={styles.info}>Info: {localMessage}</p>
      )}
    </div>
  );
}
