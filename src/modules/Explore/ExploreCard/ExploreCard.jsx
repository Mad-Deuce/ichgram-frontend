import { Link } from "react-router-dom";

import styles from "./ExploreCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ExploreCard({ post }) {
  return (
    <div className={styles.exploreCard}>
      <Link to={`/post/${post.id}`} className={styles.link}>
        <div className={styles.imgWrapper}>
          <img src={`${baseURL}/${post.image}`} className={styles.image}/>
        </div>
      </Link>
    </div>
  );
}
