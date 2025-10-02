import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import Card from "./Card/Card";

import styles from "./Notifications.module.css";

const nots = [
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "liked your photo",
    date: DateTime.now().minus({ days: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "commented your photo",
    date: DateTime.now().minus({ weeks: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "started following",
    date: DateTime.now().minus({ months: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "started following",
    date: DateTime.now().minus({ years: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "started following",
    date: DateTime.now().minus({ hours: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
  {
    user: { id: 1, username: "sashaa", avatar: "/public/avatar.jpg" },
    action: "started following",
    date: DateTime.now().minus({ minutes: 2 }).toString(),
    post: { img: "/public/photo.jpg", id: 1 },
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(nots);
  }, []);

  const elements = notifications.map((item, idx) => (
    <Card key={idx} item={item} />
  ));

  return (
    <div className={styles.notifications}>
      <h1 className={styles.title}>Notifications</h1>
      <h2 className={styles.subTitle}>New</h2>
      {elements}
    </div>
  );
}
