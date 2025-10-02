import { useEffect, useState } from "react";

import TextField from "/src/shared/components/TextField/TextField";

import Card from "./Card/Card";

import styles from "./Search.module.css";

const mockFoundedUsers = [
  { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
];
const mockRecentUsers = [
  { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
  { id: 2, username: "sashaa", avatar: "/public/avatar.jpg" },
  { id: 3, username: "sashaa", avatar: "/public/avatar.jpg" },
];

export default function Notifications() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [foundedUsers, setFoundedUsers] = useState([]);

  useEffect(() => {
    setRecentUsers(mockRecentUsers);
    setFoundedUsers(mockFoundedUsers);
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  const foundedUsersElements = foundedUsers.map((item) => (
    <Card key={item.id} item={item} />
  ));

  const recentUsersElements = recentUsers.map((item) => (
    <Card key={item.id} item={item} />
  ));

  return (
    <div className={styles.search}>
      <h1 className={styles.title}>Search</h1>
      <input
        type="search"
        placeholder="Search"
        name="search"
        onChange={handleOnChange}
        className={styles.input}
      />
      {foundedUsersElements}
      <h2 className={styles.subTitle}>Recent</h2>
      {recentUsersElements}
    </div>
  );
}
