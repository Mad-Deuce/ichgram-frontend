import { useState } from "react";

import styles from "./Upload.module.css";

export default function Upload({
  className,
  register = () => {},
  name = "file",
  setValue,
}) {
  const fullClassName = `${styles.upload} ${className}`;
  const [fileSrc, setFileSrc] = useState(null);

  const handleOnFileUploadChange = (event) => {
    const fileSrc = URL.createObjectURL(event.target.files[0]);
    setFileSrc(fileSrc);
    setValue("image", event.target.files[0])
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
          type="file"
          // multiple={false}
          // multiple
          // accept="image/*"
          onChange={handleOnFileUploadChange}
          className={styles.input}
          // title=""
        />
      </div>
    </div>
  );
}
