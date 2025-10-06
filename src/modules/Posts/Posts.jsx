import { useState } from "react";

import Card from "./Card/Card";

import useFetch from "/src/shared/hooks/useFetch";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const { state, fetchData } = useFetch(null);

  const sendComment = async (comment) => {
    await fetchData(() => createCommentApi(comment));
    console.log("createdComment: ", state?.comment);
    const post = await posts.find((item) => item.id === state?.comment.postId);
    if (post) {
      post.totalComments += 1;
      post.comments.unshift(state?.comment);
    }
    console.log("post: ", post);
  };

  const likePost = (postId) => {
    // fetchData(() => likePostApi({ postId }));
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
