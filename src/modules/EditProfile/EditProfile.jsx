import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";

import Button from "/src/shared/components/Button/Button";
import TextField from "/src/shared/components/TextField/TextField";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { fields, editProfileSchema } from "./fields";

import styles from "./EditProfile.module.css";
import { useEffect } from "react";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function EditProfile({ user, updateProfile }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: "onChange",
  });
  const [_render, setRender] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    setValue(fields.username.name, user?.username);
    setValue(fields.website.name, user?.website);
    setValue(fields.about.name, user?.about);
  }, [user, setValue]);

  const handleOnFileUploadChange = (event) => {
    const file = event.target.files[0];
    setRender((prev) => !prev);
    avatarRef.current.src = URL.createObjectURL(file)
    setValue(fields.avatar.name, file);
  };

  const handleOnSubmit = (values) => {
    updateProfile(values);
  };

  return (
    <div className={styles.editProfile}>
      <h1 className={styles.title}>Edit profile</h1>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            ref={avatarRef}
            src={`${baseURL}/${user?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.username}>{user?.username}</p>
          <p className={styles.about}>{user?.about}</p>
        </div>
        <input
          id="file-upload"
          {...register(fields.avatar.name)}
          {...fields.avatar}
          className={styles.fileInput}
          form="editProfileForm"
          onChange={handleOnFileUploadChange}
        />
        <label
          htmlFor="file-upload"
          form="editProfileForm"
          className={styles.fileInputLabel}
        >
          New photo
        </label>
      </div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.form}
        id="editProfileForm"
      >
        <h2 className={styles.fieldTitle}>Username</h2>
        <TextField
          variant="outlined"
          className={styles.textInput}
          register={register}
          {...fields.username}
          error={errors?.username}
        />
        <h2 className={styles.fieldTitle}>Website</h2>
        <TextField
          variant="outlined"
          className={styles.textInput}
          register={register}
          {...fields.website}
          error={errors?.website}
        />
        <h2 className={styles.fieldTitle}>About</h2>
        <textarea
          {...register(fields.about.name)}
          {...fields.about}
          className={styles.textarea}
        />
        <LoadingErrorOutput error={errors?.about?.message} />

        <Button type="submit" variant="contained" className={styles.btnSave}>
          Save
        </Button>
      </form>
    </div>
  );
}
