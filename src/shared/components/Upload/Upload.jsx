import { useEffect, useRef } from "react";

import styles from "./Upload.module.css";

export default function Upload({
  className,
  name,
  setValue,
  reset = true,
  ...props
}) {
  const fullClassName = `${styles.upload} ${className}`;

  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current.src = null;
  }, [reset]);

  const handleOnFileUploadChange = (event) => {
    const file = event.target.files[0];
    imageRef.current.src = URL.createObjectURL(file);

    setValue(name, file);
  };

  return (
    <div className={fullClassName}>
      <img src={null} alt="" className={styles.preview} ref={imageRef} />
      <div className={styles.modal}>
        <img
          src="/src/assets/icons/upload.svg"
          alt=""
          className={styles.icon}
        />

        <input
          {...props}
          onChange={handleOnFileUploadChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
