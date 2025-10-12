import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useFetch from "/src/shared/hooks/temp/useFetch";
import { getPostByIdApi } from "/src/shared/api/post-api";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import { selectUser } from "/src/redux/auth/auth-selectors";
import { toNotificationFormat } from "/src/shared/utils/dateFormat";

import TextEditor from "/src/shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import {
  AdditionalIcon,
  LikeIcon,
  CommentIcon,
} from "/src/shared/components/icons";

import { fields, commentSchema } from "./fields";

import styles from "./ViewPost.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ViewPost({ postId }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });
  const getPostByIdApiCallback = useCallback(
    () => getPostByIdApi(postId),
    [postId]
  );
  const {
    state: postData,
    setState,
    // error: postError,
    // loading: postLoading,
  } = useFetch(getPostByIdApiCallback, null);

  const currentUser = useSelector(selectUser);
  const isPostUserFollowed = postData?.post?.user?.followers.some(
    (follow) => follow.followerUserId === currentUser.id
  );
  // const [state, setState] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [_message, setMessage] = useState(null);

  const sendComment = async (comment) => {
    setLoading(true);
    setError(null);
    const { data, error } = await createCommentApi({
      postId: postData.post.id,
      text: comment.comment,
    });
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    const post = postData.post;
    if (post) {
      setState((prev) => {
        post.totalComments += 1;
        if (!post.comments) post.comments = [];
        post.comments.unshift(data?.comment);
        post.comments = post.comments.slice(0, 4);
        return { ...prev };
      });
    }
  };

  const likePost = async (postId) => {
    if (postData.post.isLiked) return;
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
    const post = postData.post;
    if (post) {
      setState((prev) => {
        post.totalLikes = Number(post.totalLikes) + 1;
        post.isLiked = true;
        return { ...prev };
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

  const commentElements = postData?.post?.comments?.map((comment) => {
    return (
      <div key={comment.id} className={styles.comment}>
        <Link
          to={`/profile/${comment?.user?.id}`}
          className={styles.avatarWrapper}
        >
          <img
            src={`${baseURL}/${comment.user?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </Link>

        <div className={styles.commentTextWrapper}>
          <Link to={`/profile/${comment.user?.id}`} className={styles.username}>
            {comment?.user?.username}
          </Link>
          <span className={styles.commentText}> {comment?.text}</span>
          <p className={styles.commentDate}>
            {toNotificationFormat(comment?.updatedAt)}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div
      className={styles.viewPost}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={`${baseURL}/${postData?.post?.image}`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link
              to={`/profile/${postData?.post?.user?.id}`}
              className={styles.avatarWrapper}
            >
              <img
                src={`${baseURL}/${postData?.post?.user?.avatar}`}
                alt=""
                className={styles.avatar}
              />
            </Link>
            <Link
              to={`/profile/${postData?.post?.user?.id}`}
              className={styles.username}
            >
              {postData?.post?.user?.username}
            </Link>

            {!isPostUserFollowed &&
              postData?.post?.user?.id !== currentUser.id && (
                <>
                  <span className={styles.username}>&bull;</span>
                  <button
                    className={styles.btn}
                    onClick={() => followUser(postData?.post?.user?.id)}
                  >
                    Subscribe
                  </button>
                </>
              )}
          </div>

          <AdditionalIcon className={styles.additionalIcon} />
        </div>
        <div className={styles.comments}>{commentElements}</div>
        <div className={styles.icons}>
          <button
            className={styles.iconBtn}
            onClick={() => likePost(postData?.post?.id)}
          >
            <LikeIcon
              className={`${styles.icon} ${
                postData?.post?.isLiked && styles.filled
              }`}
            />
          </button>

          <CommentIcon className={styles.icon} />
        </div>
        <div className={styles.statsWrapper}>
          <span className={styles.stats}>{`${
            postData?.post?.totalLikes ? postData?.post?.totalLikes : 0
          } likes`}</span>
          <span className={styles.stats}>{`${
            postData?.post?.totalComments ? postData?.post?.totalComments : 0
          } comments`}</span>
        </div>
        <form
          onSubmit={handleSubmit(sendComment)}
          className={styles.inputWrapper}
        >
          <TextEditor register={register} {...fields.comment} />
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
        <LoadingErrorOutput error={error} loading={loading} />
      </div>
    </div>
  );
}
