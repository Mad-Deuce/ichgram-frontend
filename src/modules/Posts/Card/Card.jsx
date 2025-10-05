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
  item,
  handleLike,
  sendComment,
}) {
  const fullClassName = `${styles.card} ${className} `;

  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const commentInputRef = useRef(null);
  const textRef = useRef(null);
  const currentUser = useSelector(selectUser);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setIsTextOverflowed(
      Boolean(textRef.current.offsetHeight - textRef.current.scrollHeight)
    );
  }, []);

  const handleCommentButtonClick = () => {
    setShowCommentForm((prev) => !prev);
  };
  const handleOnSubmitComment = ({comment}) => {
    console.log(comment);
    sendComment({postId: item.id, text: comment})
  };

  const handleReadMore = () => {
    textRef.current.className = `${styles.commentsWrapper} ${styles.expanded}`;
    setIsTextOverflowed(false);
  };

  const { comments } = item;
  console.log(comments);

  const commentElements = comments.map((item) => {
    return (
      <p key={item.id} className={styles.comment}>
        <Link className={styles.commentAuthor}>{item.user.username}</Link>{" "}
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
            src={`${baseURL}/${item.user.avatar}`}
            alt=""
          />
        </div>
        <Link to={`/users/${item.user.id}`} className={styles.username}>
          {item.user.username ? item.user.username : "Sashaa"}
        </Link>
        <p className={styles.date}>{toNotificationFormat(item.updatedAt)}</p>
        {currentUser.id !== item.user.id && (
          <Link className={styles.followLink}>follow</Link>
        )}
      </div>
      <Link to={`/posts/${item.id}`} className={styles.imgWrapper}>
        <img
          src={`${baseURL}/${item.image}`}
          alt="post_img"
          className={styles.img}
        />
      </Link>
      <div className={styles.controlsWrapper}>
        <Link to={`/posts/${item.id}/like`} className={styles.controlLink}>
          <LikeIcon className={styles.controlIcon} />
        </Link>
        <button
          className={styles.controlButton}
          onClick={handleCommentButtonClick}
        >
          <CommentIcon className={styles.controlIcon} />
        </button>
        {showCommentForm && (
          <form onSubmit={handleSubmit(handleOnSubmitComment)} className={styles.commentForm}>
            <input
              ref={commentInputRef}
              type="text"
              {...register("comment", { required: true })}
              className={styles.commentInput}
            />
            <button type="submit" className={styles.commentSubmitBtn}>Send</button>
          </form>
        )}
      </div>

      <p className={styles.likes}>{`${101824} likes`}</p>
      <div className={styles.commentsWrapper} ref={textRef}>
        {commentElements}

        {comments.length > 3 && (
          <Link
            to={`/posts/${item.id}/comment`}
            className={styles.commentsFooter}
          >
            {`View all comments (${comments.length})`}
          </Link>
        )}
      </div>
      {isTextOverflowed && (
        <p className={styles.readMore} onClick={handleReadMore}>
          ...more
        </p>
      )}
    </div>
  );
}
