import { useEffect, useState } from "react";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import useFetch from "/src/shared/hooks/useFetch";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";

import Card from "./Card/Card";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const [state, setState] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setState(posts);
  }, [posts]);

  const sendComment = async (comment) => {
    setLoading(true);
    setError(null);
    const { data, error } = await createCommentApi(comment);
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    const post = posts.find((item) => item.id === data?.comment.postId);
    if (post) {
      setState((prev) => {
        const post = prev.find((item) => item.id === data?.comment.postId);
        if (post) {
          post.totalComments += 1;
          post.comments.unshift(data?.comment);
          post.comments = post.comments.slice(0, 4);
        }
        return [...prev];
      });
    }
  };

  const likePost = (postId) => {
    // fetchData(() => likePostApi({ postId }));
    // fetchData(() => likePostApi({ postId }));
  };

  const elements = state.map((item) => (
    <Card
      key={item.id}
      item={item}
      sendComment={sendComment}
      likePost={likePost}
    />
  ));

  return (
    <>
      <div className={styles.posts}>{elements}</div>
      <LoadingErrorOutput
        loading={loading}
        error={error}
        message={message}
        className={styles.message}
      />
    </>
  );
}
