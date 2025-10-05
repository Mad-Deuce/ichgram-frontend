import Card from "./Card/Card";

import useFetch from "/src/shared/hooks/useFetch";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const { fetchData } = useFetch(null);

  const sendComment = (comment) => {
    fetchData(() => createCommentApi(comment));
  };

  const likePost = (postId) => {
    fetchData(() => likePostApi({ postId }));
  };

  const elements = posts.map((item) => (
    <Card
      key={item.id}
      item={item}
      sendComment={sendComment}
      likePost={likePost}
    />
  ));

  return <div className={styles.posts}>{elements}</div>;
}
