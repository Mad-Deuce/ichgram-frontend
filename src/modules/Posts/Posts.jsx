import Card from "./Card/Card";

import styles from "./Posts.module.css";

export default function Posts({ posts = [] }) {
  const elements = posts.map((item) => <Card item={item} />);

  return <div className={styles.posts}>{elements}</div>;
}
