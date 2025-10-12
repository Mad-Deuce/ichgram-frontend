import { useDispatch } from "react-redux";

import { showModal } from "/src/redux/modal/modal-slice";

import ExploreCard from "./ExploreCard/ExploreCard";

import styles from "./Explore.module.css";

export default function Explore({ posts = [], variant }) {
  const fullClassName = `${styles.explore} ${variant && styles[variant]}`;
  const dispatch = useDispatch();

  const showPost = (postId) => {
    dispatch(showModal({ type: "Post", id: postId }));
  };

  const elements = posts.map((post) => {
    return <ExploreCard key={post.id} post={post} showPost={showPost} />;
  });
  return <div className={fullClassName}>{elements}</div>;
}
