import { useForm } from "react-hook-form";

import Upload from "/src/shared/components/Upload/Upload";

import styles from "./CreatePost.module.css";

export default function CreatePostForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={styles.createPost}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create new post</h1>
          <button type="submit" className={styles.submit}>
            Share
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <Upload register={register} name={"image"}/>
        </div>
        <div className={styles.textEditor}>textEditor</div>
        <div className={styles.empty}>empty</div>
      </form>
    </div>
  );
}
