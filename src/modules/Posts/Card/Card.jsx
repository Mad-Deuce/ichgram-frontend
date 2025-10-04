import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { LikeIcon, CommentIcon } from "/src/shared/components/icons";

import { toNotificationFormat } from "/src/shared/utils/dateFormat.js";

import styles from "./Card.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Card({
  className,
  item,
  handleLike,
  handleSendComment,
}) {
  const fullClassName = `${styles.card} ${className} `;

  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const commentInputRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    setIsTextOverflowed(
      Boolean(textRef.current.offsetHeight - textRef.current.scrollHeight)
    );
  }, []);

  const handleCommentButtonClick = () => {
    setShowCommentInput((prev) => !prev);
  };

  const handleReadMore = () => {
    textRef.current.className = `${styles.commentsWrapper} ${styles.expanded}`;
    setIsTextOverflowed(false);
  };

  const comments = [1, 2].map((item) => {
    return (
      <p className={styles.comment}>
        <Link className={styles.commentAuthor}>{"Sashaa"}</Link>{" "}
        <span className={styles.commentText}>{"It's golden, Ponyboy!"}</span>
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
        <Link className={styles.followLink}>follow</Link>
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
        {showCommentInput && (
          <input
            ref={commentInputRef}
            type="text"
            name="comment"
            className={styles.commentInput}
          />
        )}
      </div>

      <p className={styles.likes}>{`${101824} likes`}</p>
      <div className={styles.commentsWrapper} ref={textRef}>
        {comments}

        <Link
          to={`/posts/${item.id}/comment`}
          className={styles.commentsFooter}
        >
          {`View all comments (${732})`}
        </Link>
      </div>
      {isTextOverflowed && (
        <p className={styles.readMore} onClick={handleReadMore}>
          ...more
        </p>
      )}
    </div>
  );
}
