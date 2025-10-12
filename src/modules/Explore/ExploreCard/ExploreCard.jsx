import { Link } from "react-router-dom";

import styles from "./ExploreCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ExploreCard({ post, showPost }) {
  return (
    <div className={styles.exploreCard} onClick={() => showPost(post.id)}>
      <div className={styles.imgWrapper}>
        <img src={`${baseURL}/${post.image}`} className={styles.image} />
      </div>
    </div>
  );
}
