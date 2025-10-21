import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";
import TextField from "/src/shared/components/TextField/TextField";

import useFetch from "/src/shared/hooks/temp/useFetch";
import {
  getMessagesByChatIdApi,
  createMessageApi,
} from "/src/shared/api/chat-api";
import { Socket } from "/src/shared/socket/socket-client";

import Message from "./Message/Message";

import styles from "./Messenger.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Messenger({ chat, currentUser }) {
  const { register, handleSubmit, reset } = useForm();
  const msgBoxRef = useRef();

  const otherUser =
    chat.member1Id == currentUser.id ? chat.member2 : chat.member1;

  const getMessagesByChatIdApiCallback = useCallback(
    () => getMessagesByChatIdApi(chat.id),
    [chat.id]
  );
  const { state, loading, error, setError, setLoading, setState } = useFetch(
    getMessagesByChatIdApiCallback,
    []
  );

  useEffect(() => {
    const socket = Socket.getInstance();
    socket.on("connect", function () {
      console.log("Socket connected", socket.connected);
    });
    socket.on("newMessage", (newMessage) => {
      setState((prev) => {
        prev.push(newMessage);
        return [...prev];
      });
    });

    return () => {
      socket.disconnect();
      console.log("Socket connected", socket.connected);
    };
  }, [chat.id]);

  useEffect(() => {
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  });

  const handleOnSubmit = async (values) => {
    const message = { ...values, authorId: currentUser.id, chatId: chat.id };
    setError(null);
    setLoading(true);
    const { error } = await createMessageApi(message);
    setLoading(false);
    if (error) return setError(error.response?.data?.message || error.message);
    reset();
  };

  const messageElements = state.map((message) => (
    <Message
      key={message.id}
      message={message}
      isMy={message.authorId === currentUser.id}
    />
  ));

  return (
    <div className={styles.messenger}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            src={`${baseURL}/${otherUser?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <p className={styles.username}>{otherUser?.username}</p>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userInfoAvatarWrapper}>
          <img
            src={`${baseURL}/${otherUser?.avatar}`}
            alt=""
            className={styles.userInfoAvatar}
          />
        </div>
        <p className={styles.userInfoUsername}>{otherUser?.username}</p>
        <p className={styles.userInfoFullname}>{otherUser?.fullname}</p>
        <Link
          to={`/profile/${otherUser?.id}`}
          className={styles.userInfoButton}
        >
          View Profile
        </Link>
        <p className={styles.date}>{new Date().toUTCString()}</p>
      </div>
      <div className={styles.messages} ref={msgBoxRef}>
        {messageElements}
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
        <TextField
          register={register}
          name="text"
          placeholder="Write text"
          className={styles.input}
          variant="filled"
        />
      </form>
      <LoadingErrorOutput loading={loading} error={error} />
    </div>
  );
}
