import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addUser } from "/src/redux/recent/recent-slice";

import styles from "./Card.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Card({ item = {}, recent = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!recent) {
      dispatch(addUser(item));
    }
    navigate(`/profile/${item.id}`);
  };

  return (
    <button type="button" className={styles.card} onClick={handleClick}>
      <div className={styles.avatarWrapper}>
        <img src={`${baseURL}/${item.avatar}`} alt="" className={styles.avatar} />
      </div>
      <span className={styles.username}>{item.username}</span>
    </button>
  );
}
