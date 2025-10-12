import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { showModal } from "/src/redux/modal/modal-slice";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import Card from "./Card/Card";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const [state, setState] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const showPost = (postId) => {
    dispatch(showModal({ type: "Post", id: postId }));
  };

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
        post.totalComments += 1;
        if (!post.comments) post.comments = [];
        post.comments.unshift(data?.comment);
        post.comments = post.comments.slice(0, 4);
        return [...prev];
      });
    }
  };

  const likePost = async (postId) => {
    setLoading(true);
    setError(null);
    const { data, error } = await likePostApi({ postId });
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    const post = posts.find((item) => item.id === data?.like.postId);
    if (post) {
      setState((prev) => {
        post.totalLikes = Number(post.totalLikes) + 1;
        post.isLiked = true;
        return [...prev];
      });
    }
  };

  const followUser = async (targetUserId) => {
    setLoading(true);
    setError(null);
    const { data, error } = await followUserApi({ targetUserId });
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setState((prev) => {
      prev.map((post) => {
        if (post.user.id === data.follow.targetUserId)
          post.user.followers.push(data.follow);
        return post;
      });
      return prev;
    });
  };

  const elements = state.map((post) => (
    <Card
      key={post.id}
      post={post}
      sendComment={sendComment}
      likePost={likePost}
      followUser={followUser}
      showPost={showPost}
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
