import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCurrentUser } from "/src/redux/auth/auth-thunks";
import { selectUser } from "/src/redux/auth/auth-selectors";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // const id = setInterval(() => {
    //   console.log("settimeout", id);
    //   dispatch(getCurrentUser());
    // }, 3000);
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      <p>HomePage</p>
      {user && <p>{user.email}</p>}
    </div>
  );
}
