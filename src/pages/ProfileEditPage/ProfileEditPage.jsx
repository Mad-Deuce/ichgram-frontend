import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import EditProfile from "/src/modules/EditProfile/EditProfile";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import useFetch from "/src/shared/hooks/temp/useFetch";
import { getUserByIdApi, updateUserApi } from "/src/shared/api/user-api";

import styles from "./ProfileEditPage.module.css";

export default function ProfileEditPage() {
  const profileId = useParams().id;
  const getUserByIdApiCallback = useCallback(
    () => getUserByIdApi(profileId),
    [profileId]
  );
  const { state, setState, error, setError, loading, setLoading } = useFetch(
    getUserByIdApiCallback,
    null
  );
  const [message, setMessage] = useState(null);

  const updateProfile = async (payload) => {
    setError(null);
    setLoading(true);
    const { data, error } = await updateUserApi(payload);
    setLoading(false);
    if (error) return setError(error.response?.data?.message || error.message);
    setMessage(data?.message);
    setState(data);
    console.log(data);
  };

  return (
    <div className={styles.profileEditPage}>
      <LoadingErrorOutput error={error} loading={loading} message={message} />
      <EditProfile user={state?.user} updateProfile={updateProfile} />
    </div>
  );
}
