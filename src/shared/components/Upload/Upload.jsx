import { useEffect, useState } from "react";

import styles from "./Upload.module.css";

export default function Upload({
  className,
  register = () => {},
  name,
  setValue,
  reset = true,
  ...props
}) {
  const fullClassName = `${styles.upload} ${className}`;

  const [fileSrc, setFileSrc] = useState(null);

  useEffect(() => {
    setFileSrc(null);
  }, [reset]);

  const handleOnFileUploadChange = (event) => {
    // console.log(event);

    const fileSrc = URL.createObjectURL(event.target.files[0]);
    setFileSrc(fileSrc);
    setValue(name, event.target.files[0]);
  };

  return (
    <div className={fullClassName}>
      {fileSrc && <img src={fileSrc} alt="" className={styles.preview} />}
      <div className={styles.modal}>
        <img
          src="/src/assets/icons/upload.svg"
          alt=""
          className={styles.icon}
        />

        <input
          {...register(name)}
          {...props}
          onChange={handleOnFileUploadChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
