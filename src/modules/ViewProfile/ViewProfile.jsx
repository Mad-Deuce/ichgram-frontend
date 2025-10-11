import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Button from "/src/shared/components/Button/Button";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { selectUser } from "/src/redux/auth/auth-selectors";
import { followUserApi } from "/src/shared/api/follow-api";

import styles from "./ViewProfile.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ViewProfile({ user }) {
  const currentUser = useSelector(selectUser);
  const isMyProfile = currentUser.id === user?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const followUser = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await followUserApi({ targetUserId: user.id });
    setLoading(false);
    if (error) {
      return setError(error.response?.data?.message || error.message);
    }
    setMessage(data.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    user.isFollowed = true;
  };

  return (
    <div className={styles.viewProfile}>
      <LoadingErrorOutput loading={loading} error={error} message={message} />
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            src={`${baseURL}/${user?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <Link to={user?.website} target="blank" className={styles.username}>
              {user?.username}
            </Link>
            {!isMyProfile && !user?.isFollowed && (
              <Button
                variant="contained"
                className={styles.btnFollow}
                handleClick={followUser}
              >
                Follow
              </Button>
            )}
            {!isMyProfile ? (
              <Link to={`/messages/${user?.id}`} className={styles.btnMessage}>Message</Link>
            ) : (
              <Link
                to={`edit`}
                className={styles.btnMessage}
              >
                Edit profile
              </Link>
            )}
          </div>
          <div className={styles.statsWrapper}>
            <span
              className={styles.statsValue}
            >{`${user?.totalPosts} posts`}</span>
            <span
              className={styles.statsValue}
            >{`${user?.totalFollowers} followers`}</span>
            <span
              className={styles.statsValue}
            >{`${user?.totalFollows} following`}</span>
          </div>
          <div className={styles.aboutWrapper}>
            <p className={styles.about}>{user?.about}</p>
          </div>
          <div className={styles.linkWrapper}>
            <Link to={user?.website} target="blank" className={styles.link}>
              {user?.website}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
