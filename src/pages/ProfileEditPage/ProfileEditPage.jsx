import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditProfile from "/src/modules/EditProfile/EditProfile";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { selectAuth } from "/src/redux/auth/auth-selectors";
import { updateUser } from "/src/redux/auth/auth-thunks";
import useFetch from "/src/shared/hooks/temp/useFetch";
import { getUserByIdApi } from "/src/shared/api/user-api";

import styles from "./ProfileEditPage.module.css";

export default function ProfileEditPage() {
  const dispatch = useDispatch();
  const profileId = useParams().id;
  const {
    error: authError,
    loading: authLoading,
    user,
  } = useSelector(selectAuth);
  const getUserByIdApiCallback = useCallback(
    () => getUserByIdApi(profileId),
    [profileId]
  );
  const { state,  error,  loading } = useFetch(
    getUserByIdApiCallback,
    null
  );

  const updateProfile = async (payload) => {
    dispatch(updateUser(payload));
  };

  return (
    <div className={styles.profileEditPage}>
      <LoadingErrorOutput
        error={error | authError}
        loading={loading | authLoading}
      />
      <EditProfile user={state?.user} updateProfile={updateProfile} />
    </div>
  );
}
