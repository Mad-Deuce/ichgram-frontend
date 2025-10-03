import { useForm } from "react-hook-form";
import { useState } from "react";

import Upload from "/src/shared/components/Upload/Upload";
import TextEditor from "/src/shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { createPostApi } from "/src/shared/api/post-api";
import instance from "../../shared/api/instance";

import styles from "./CreatePost.module.css";

export default function CreatePostForm() {
  const { register, handleSubmit, setValue } = useForm();

  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);



  const onSubmit = async (values) => {
    console.log("values: ", values);

    setLoading(true);
    setError(null);
    const { data, error } = await createPostApi(values);
    setLoading(false);
    if (data) return setState(data);
    setError(error.response?.data?.message || error.message);
  };

  return (
    <div className={styles.createPost}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className={styles.form}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Create new post</h1>
          <button type="submit" className={styles.submit}>
            Share
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <Upload register={register} name={"image"} setValue={setValue} />
        </div>
        <div className={styles.textEditorWrapper}>
          <TextEditor register={register} name={"content"} />
        </div>
      </form>
      <LoadingErrorOutput loading={loading} error={error} message={message} />
    </div>
  );
}
