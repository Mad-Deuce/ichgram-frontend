import { useEffect } from "react";

import Posts from "/src/modules/Posts/Posts";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";
import { ConfirmIcon } from "/src/shared/components/icons";

import useFetch from "/src/shared/hooks/useFetch";
import { getLastUpdatedPostsApi } from "../../shared/api/post-api";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { state, loading, error, fetchData } = useFetch([]);

  useEffect(() => {
    fetchData(getLastUpdatedPostsApi);
  }, []);

  console.log(state);

  return (
    <div className={styles.homePage}>
      <LoadingErrorOutput loading={loading} error={error} />
      <Posts posts={state?.posts} />
      <div className={styles.end}>
        <ConfirmIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
      </div>
    </div>
  );
}
