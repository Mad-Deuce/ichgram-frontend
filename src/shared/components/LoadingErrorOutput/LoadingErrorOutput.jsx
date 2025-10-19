import { useEffect, useState } from "react";

import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({
  className,
  loading,
  error,
  message,
}) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;

  const [localMessage, setLocalMessage] = useState(message);

  useEffect(() => {
    setLocalMessage(message);
    console.log(message);

    if (!message) return;

    const t = setTimeout(() => {
      setLocalMessage(null);
    }, 5000);

    return () => clearTimeout(t);
  }, [message]);

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
