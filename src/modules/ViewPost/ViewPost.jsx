import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { hideModal } from "/src/redux/modal/modal-slice";

import useRequest from "/src/shared/hooks/temp/useRequest";
import useFetch from "/src/shared/hooks/temp/useFetch";
import { getPostByIdApi } from "/src/shared/api/post-api";
import { createCommentApi } from "/src/shared/api/comment-api";
import { likePostApi } from "/src/shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

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
import { deletePostByIdApi } from "../../shared/api/post-api";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ViewPost({ postId }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPostByIdApiCallback = useCallback(
    () => getPostByIdApi(postId),
    [postId]
  );
  const {
    state: postData,
    setState: setPostData,
  } = useFetch(getPostByIdApiCallback, null);
  const { loading, error, message, sendRequest } = useRequest();
  const [render, setRender] = useState(true);

  const currentUser = useSelector(selectUser);
  const isPostUserFollowed = postData?.post?.user?.followers.some(
    (follow) => follow.followerUserId === currentUser.id
  );
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);


  const sendComment = async (comment) => {
    const { comment: createdComment } = await sendRequest(() =>
      createCommentApi({
        postId: postData.post.id,
        text: comment.comment,
      })
    );
    setRender((prev) => !prev);
    const { post } = postData;
    if (post) {
      setPostData((prev) => {
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
    if (postData.post.isLiked) return;
    await sendRequest(() => likePostApi({ postId }));
    setRender((prev) => !prev);
    const { post } = postData;
    if (post) {
      setPostData((prev) => {
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
    const { post } = postData;
    setPostData((prev) => {
      if (post.user.id === follow.targetUserId)
        post.user.followers.push(follow);
      return { ...prev };
    });
  };

  const closePost = async () => {
    dispatch(hideModal());
  };

  const deletePost = async () => {
    if (postData?.post?.user?.id !== currentUser.id) return;
    dispatch(hideModal());
    const { data, error } = await deletePostByIdApi(postId);
    if (error) alert(error.response?.data?.message || error.message);
    alert(data.message);
    navigate("/");
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
          <button
            className={styles.additionalBtn}
            onClick={() => setDialogShow(true)}
          >
            <AdditionalIcon className={styles.additionalIcon} />
          </button>
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
