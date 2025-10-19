import { useDispatch } from "react-redux";

import { showModal } from "/src/redux/modal/modal-slice";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import useRequest from "../../shared/hooks/temp/useRequest";

import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import Card from "./Card/Card";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const dispatch = useDispatch();
  const { loading, error, message, sendRequest } = useRequest();

  const showPost = (postId) => {
    dispatch(showModal({ type: "Post", id: postId }));
  };

  const sendComment = async (comment) => {
    const { comment: createdComment } = await sendRequest(() =>
      createCommentApi(comment)
    );
    const post = posts.find((item) => item.id === createdComment.postId);
    if (post) {
      post.totalComments += 1;
      if (!post.comments) post.comments = [];
      post.comments.unshift(createdComment);
      post.comments = post.comments.slice(0, 4);
    }
  };

  const likePost = async (postId) => {
    const data = await sendRequest(() => likePostApi({ postId }));
    const post = posts.find((item) => item.id === data?.like.postId);
    if (post) {
      post.totalLikes = Number(post.totalLikes) + 1;
      post.isLiked = true;
    }
  };

  const followUser = async (targetUserId) => {
    const data = await sendRequest(() => followUserApi({ targetUserId }));
    posts.map((post) => {
      if (post.user.id === data.follow.targetUserId)
        post.user.followers.push(data.follow);
      return post;
    });
  };

  const elements = posts.map((post) => (
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
