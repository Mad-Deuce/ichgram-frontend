import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { hideModal } from "/src/redux/modal/modal-slice";

import useRequest from "/src/shared/hooks/temp/useRequest";
import { getPostByIdApi } from "/src/shared/api/post-api";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";
import { followUserApi } from "/src/shared/api/follow-api";
import { deletePostByIdApi } from "/src/shared/api/post-api";

import { selectUser } from "/src/redux/auth/auth-selectors";
import { toNotificationFormat } from "/src/shared/utils/dateFormat";

import TextEditor from "/src/shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";
import Dialog from "/src/shared/components/Dialog/Dialog";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, sendRequest } = useRequest();
  const [render, setRender] = useState(true);
  const [post, setPost] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { post } = await sendRequest(() => getPostByIdApi(postId));
      setPost(post);
    };
    fetchData();
  }, []);

  const currentUser = useSelector(selectUser);
  const isPostUserFollowed = post?.user?.followers.some(
    (follow) => follow.followerUserId === currentUser.id
  );
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);

  const sendComment = async (comment) => {
    const { comment: createdComment } = await sendRequest(() =>
      createCommentApi({
        postId: post.id,
        text: comment.comment,
      })
    );
    setRender((prev) => !prev);
    if (post) {
      setPost((prev) => {
        if (!post?.totalComments) post.totalComments = 0;
        post.totalComments += 1;
        if (!post.comments) post.comments = [];
        post.comments.unshift(createdComment);
        return { ...prev };
      });
      setReset((prev) => !prev);
    }
  };

  const likePost = async (postId) => {
    if (post.isLiked) return;
    await sendRequest(() => likePostApi({ postId }));
    setRender((prev) => !prev);
    if (post) {
      setPost((prev) => {
        if (!post?.totalLikes) post.totalLikes = 0;
        post.totalLikes = Number(post.totalLikes) + 1;
        post.isLiked = true;
        return { ...prev };
      });
    }
  };

  const followUser = async (targetUserId) => {
    const { follow } = await sendRequest(() => followUserApi({ targetUserId }));
    setRender((prev) => !prev);
    setPost((prev) => {
      if (post.user.id === follow.targetUserId)
        post.user.followers.push(follow);
      return { ...prev };
    });
  };

  const closePost = async () => {
    dispatch(hideModal());
  };

  const deletePost = async () => {
    if (post?.user?.id !== currentUser.id) return;
    dispatch(hideModal());
    const data = await sendRequest(() => deletePostByIdApi(postId));
    alert(data.message);
    navigate("/");
  };

  const commentElements = post?.comments?.map((comment) => {
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
          src={`${baseURL}/${post?.image}`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link
              to={`/profile/${post?.user?.id}`}
              className={styles.avatarWrapper}
            >
              <img
                src={`${baseURL}/${post?.user?.avatar}`}
                alt=""
                className={styles.avatar}
              />
            </Link>
            <Link to={`/profile/${post?.user?.id}`} className={styles.username}>
              {post?.user?.username}
            </Link>

            {!isPostUserFollowed && post?.user?.id !== currentUser.id && (
              <>
                <span className={styles.username}>&bull;</span>
                <button
                  className={styles.btn}
                  onClick={() => followUser(post?.user?.id)}
                >
                  Subscribe
                </button>
              </>
            )}
          </div>
          <button
            className={styles.additionalBtn}
            onClick={() => setDialogShow(true)}
          >
            <AdditionalIcon className={styles.additionalIcon} />
          </button>
        </div>
        <div className={styles.comments}>{commentElements}</div>
        <div className={styles.icons}>
          <button className={styles.iconBtn} onClick={() => likePost(post?.id)}>
            <LikeIcon
              className={`${styles.icon} ${post?.isLiked && styles.filled}`}
            />
          </button>

          <CommentIcon className={styles.icon} />
        </div>
        <div className={styles.statsWrapper}>
          <span className={styles.stats}>{`${
            post?.totalLikes ? post?.totalLikes : 0
          } likes`}</span>
          <span className={styles.stats}>{`${
            post?.totalComments ? post?.totalComments : 0
          } comments`}</span>
        </div>
        <form
          onSubmit={handleSubmit(sendComment)}
          className={styles.inputWrapper}
        >
          <TextEditor register={register} {...fields.comment} reset={reset} />
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
        <LoadingErrorOutput
          error={error}
          loading={loading}
          message={message}
          render={render}
        />
      </div>
      {dialogShow && (
        <Dialog
          setDialogShow={setDialogShow}
          deletePost={deletePost}
          closePost={closePost}
        />
      )}
    </div>
  );
}
