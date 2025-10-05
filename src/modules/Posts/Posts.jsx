import Card from "./Card/Card";

import useFetch from "/src/shared/hooks/useFetch";
import { createCommentApi } from "../../shared/api/comment-api";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const { fetchData } = useFetch(null);

  const sendComment = (comment) => {
    fetchData(() => createCommentApi(comment));
  };

  const elements = posts.map((item) => (
    <Card key={item.id} item={item} sendComment={sendComment} />
  ));

  return <div className={styles.posts}>{elements}</div>;
}
