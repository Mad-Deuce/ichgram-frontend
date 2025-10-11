import ExploreCard from "./ExploreCard/ExploreCard";

import styles from "./Explore.module.css";

export default function Explore({ posts = [], variant }) {
  const fullClassName = `${styles.explore} ${variant && styles[variant] }`;

  const elements = posts.map((post) => {
    return <ExploreCard key={post.id} post={post} />;
  });
  return <div className={fullClassName}>{elements}</div>;
}
