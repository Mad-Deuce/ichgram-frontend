import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import Upload from "/src/shared/components/Upload/Upload";
import TextEditor from "/src/shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { createPostApi } from "/src/shared/api/post-api";
import { hideModal } from "/src/redux/modal/modal-slice";


import { fields, createPostSchema } from "./fields";

import styles from "./CreatePost.module.css";

export default function CreatePostForm() {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(createPostSchema),
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    setError(null);
    setLoading(true);
    const { data, error } = await createPostApi(values);
    setLoading(false);
    if (error) return setError(error.response?.data?.message || error.message);
    setMessage(data.message);
    setReset((prev) => !prev);
    closePost();
  };

  const closePost = () => {
    dispatch(hideModal());
  };

  return (
    <div
      className={styles.createPost}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.form}
        id="postForm"
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Create new post</h1>
          <button type="submit" className={styles.submit}>
            Share
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <Upload
            {...fields.image}
            setValue={setValue}
            reset={reset}
            form="postForm"
          />
        </div>
        <div className={styles.textEditorWrapper}>
          <TextEditor register={register} {...fields.comment} reset={reset} />
        </div>
        <div className={styles.messageWrapper}>
          <LoadingErrorOutput
            loading={loading}
            error={error}
            message={`${message}`}
          />
        </div>
      </form>
    </div>
  );
}
