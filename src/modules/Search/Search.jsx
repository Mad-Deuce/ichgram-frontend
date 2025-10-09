import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { selectRecentUsers } from "/src/redux/recent/recent-selectors";

import { fields, registerSchema } from "./fields";

import { findUsersApi } from "../../shared/api/user-api";

import Card from "./Card/Card";

import styles from "./Search.module.css";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foundedUsers, setFoundedUsers] = useState([]);
  const recentUsers = useSelector(selectRecentUsers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const handleOnChange = async (values) => {
    setLoading(true);
    setError(null);
    const { data, error } = await findUsersApi(values);
    setLoading(false);
    if (error) return setError(error.response?.data?.message || error.message);
    setFoundedUsers(data.users);
  };

  const foundedUsersElements = foundedUsers.map((item) => (
    <Card key={item.id} item={item} />
  ));

  const recentUsersElements = recentUsers.map((item) => (
    <Card key={item.id} item={item} recent={true} />
  ));

  return (
    <form onChange={handleSubmit(handleOnChange)} className={styles.search}>
      <h1 className={styles.title}>Search</h1>
      <input
        {...register(fields.username.name)}
        {...fields.username}
        className={styles.input}
      />
      {foundedUsersElements}
      <h2 className={styles.subTitle}>Recent</h2>
      {recentUsersElements}
      <LoadingErrorOutput
        error={errors.username?.message || error}
        loading={loading}
      />
    </form>
  );
}
