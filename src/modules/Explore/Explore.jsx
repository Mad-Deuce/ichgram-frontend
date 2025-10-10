import ExploreCard from "./ExploreCard/ExploreCard";

import styles from "./Explore.module.css";

export default function Explore({ posts = [] }) {
  const elements = posts.map((post) => {
    return <ExploreCard key={post.id} post={post} />;
  });
  return <div className={styles.explore}>{elements}</div>;
}
