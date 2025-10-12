import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { LikeIcon, CommentIcon } from "/src/shared/components/icons";

import { selectUser } from "/src/redux/auth/auth-selectors";
import { toNotificationFormat } from "/src/shared/utils/dateFormat.js";

import styles from "./Card.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Card({
  className,
  post,
  likePost,
  sendComment,
  followUser,
  showPost,
}) {
  const fullClassName = `${styles.card} ${className} `;

  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const commentInputRef = useRef(null);
  const textRef = useRef(null);
  const currentUser = useSelector(selectUser);
  const { register, handleSubmit } = useForm();
  const isPostUserFollowed = post.user?.followers.some(
    (follow) => follow.followerUserId === currentUser.id
  );

  useEffect(() => {
    setIsTextOverflowed(
      Boolean(textRef.current.offsetHeight - textRef.current.scrollHeight)
    );
  }, []);

  const handleFollowButtonClick = () => {
    if (post.userId === currentUser.id) return;
    followUser(post.userId);
  };

  const handleLikeButtonClick = () => {
    // if (post.userId === currentUser.id) return;      // !!!!! not remove
    if (post.isLiked) return;
    likePost(post.id);
  };
  const handleCommentButtonClick = () => {
    setShowCommentForm((prev) => !prev);
  };
  const handleOnSubmitComment = ({ comment }) => {
    sendComment({ postId: post.id, text: comment });
  };

  const handleReadMore = () => {
    textRef.current.className = `${styles.commentsWrapper} ${styles.expanded}`;
    setIsTextOverflowed(false);
  };

  const { comments } = post;

  const commentElements = comments?.map((item) => {
    return (
      <p key={item.id} className={styles.comment}>
        <Link to={`profile/${item.userId}`} className={styles.commentAuthor}>{item.user?.username}</Link>{" "}
        <span className={styles.commentText}>{item.text}</span>
      </p>
    );
  });

  return (
    <div className={fullClassName}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.avatarWrapper}
            src={`${baseURL}/${post.user?.avatar}`}
            alt=""
          />
        </div>
        <Link to={`/profile/${post.userId}`} className={styles.username}>
          {post.user.username ? post.user.username : "Sashaa"}
        </Link>
        <p className={styles.date}>{toNotificationFormat(post.updatedAt)}</p>
        {currentUser.id !== post.user.id && !isPostUserFollowed && (
          <button
            className={styles.followBtn}
            onClick={handleFollowButtonClick}
          >
            follow
          </button>
        )}
      </div>

      <button to={`/posts/${post.id}`} className={styles.imgWrapper} onClick={()=>showPost(post.id)}>
        <img
          src={`${baseURL}/${post.image}`}
          alt="post_img"
          className={styles.img}
        />
      </button>
      <div className={styles.controlsWrapper}>
        <button
          className={styles.controlButton}
          onClick={handleLikeButtonClick}
        >
          <LikeIcon
            className={`${styles.controlIcon} ${post.isLiked && styles.filled}`}
          />
        </button>
        <button
          className={styles.controlButton}
          onClick={handleCommentButtonClick}
        >
          <CommentIcon
            className={`${styles.controlIcon} ${
              showCommentForm && styles.filled
            }`}
          />
        </button>
      </div>

      {post.totalLikes>0 && <p className={styles.likes}>{`${post.totalLikes} likes`}</p>}
      {showCommentForm && (
        <form
          onSubmit={handleSubmit(handleOnSubmitComment)}
          className={styles.commentForm}
        >
          <input
            ref={commentInputRef}
            type="text"
            {...register("comment", { required: true })}
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentSubmitBtn}>
            Send
          </button>
        </form>
      )}
      <div className={styles.commentsWrapper} ref={textRef}>
        {commentElements}
      </div>
      {isTextOverflowed && (
        <p className={styles.readMore} onClick={handleReadMore}>
          ...more
        </p>
      )}
      {!isTextOverflowed && comments?.length > 2 && (
        <Link to={`/posts/${post.id}`} className={styles.commentsFooter}>
          {`View all comments (${post.totalComments})`}
        </Link>
      )}
    </div>
  );
}
