import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { getLastNotificationsApi } from "../../shared/api/notification-api";

import Card from "./Card/Card";

import styles from "./Notifications.module.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      const { data, error } = await getLastNotificationsApi();
      setLoading(false);
      if (error)
        return setError(
          setError(error.response?.data?.message || error.message)
        );
      setNotifications(data.notifications);
      setMessage(data.message);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    };
    fetchData();
  }, []);

  const elements = notifications?.map((notification) => (
    <Card key={notification.id} notification={notification} />
  ));

  return (
    <div className={styles.notifications}>
      <h1 className={styles.title}>Notifications</h1>
      <h2 className={styles.subTitle}>New</h2>
      {elements}
      <LoadingErrorOutput error={error} loading={loading} message={message} />
    </div>
  );
}
