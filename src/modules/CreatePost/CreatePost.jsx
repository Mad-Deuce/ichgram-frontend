import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Upload from "/src/shared/components/Upload/Upload";
import TextEditor from "/src/shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { createPostApi } from "/src/shared/api/post-api";
import useFetch from "/src/shared/hooks/useFetch";

import { fields, createPostSchema } from "./fields";

import styles from "./CreatePost.module.css";

export default function CreatePostForm() {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(createPostSchema),
    mode: "onChange",
  });
  const { state, loading, error, fetchData } = useFetch();
  const [reset, setReset] = useState(false);

  const onSubmit = async (values) => {
    fetchData(() => createPostApi(values));
    setReset((prev) => !prev);
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
          <Upload
            register={register}
            {...fields.image}
            setValue={setValue}
            reset={reset}
          />
        </div>
        <div className={styles.textEditorWrapper}>
          <TextEditor register={register} {...fields.comment} reset={reset} />
        </div>
        <div className={styles.messageWrapper}>
          <LoadingErrorOutput
            loading={loading}
            error={error}
            message={`${state?.message}: ${state?.post?.content}`}
          />
        </div>
      </form>
    </div>
  );
}
