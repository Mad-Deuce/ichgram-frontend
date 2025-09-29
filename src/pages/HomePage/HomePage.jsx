import { useEffect, useState } from "react";

import instance from "../../shared/api/instance";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await instance.get("/");
      setState(result);
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.homePage}>
      <p>HomePage</p>
      {state && <p>{state}</p>}
    </div>
  );
}
