import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";
import TextField from "/src/shared/components/TextField/TextField";

import useFetch from "/src/shared/hooks/temp/useFetch";
import {
  getMessagesByChatIdApi,
  createMessageApi,
} from "/src/shared/api/chat-api";

import Message from "./Message/Message";

import styles from "./Messenger.module.css";

const { VITE_API_URL: baseURL, VITE_WEBSOCKET_URL: socketURL } = import.meta
  .env;

// const socket = io.connect("http://localhost:5000");
// const socket = io.connect(socketURL);

export default function Messenger({ chat, currentUser }) {
  const { register, handleSubmit, reset } = useForm();
  const msgBoxRef = useRef();
  const socket = io.connect(`${socketURL}?chatId=${chat.id}`);

  socket.on("connect", function () {
    console.log("Socket connected", socket.connected);
  });
  socket.on("newMessage", (newMessage) => {
    console.log(newMessage);
    setState((prev) => {
      prev.push(newMessage);
      return [...prev];
    });
  });
  // const memoizedSocket = useMemo(()=>{
  //   return io.connect(`${socketURL}?chatId=${chat.id}`)
  // })

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
     const connectedSockets = io.length;
     console.log('Number of connected sockets:', connectedSockets);
    return () => {
      // console.log("Disconnecting socket...");
      socket.disconnect(); // Explicitly disconnect the socket
      // if (socket.connected) {
      // }
    };
  });

  useEffect(() => {
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  });

  const handleOnSubmit = async (values) => {
    const message = { ...values, authorId: currentUser.id, chatId: chat.id };
    setError(null);
    setLoading(true);
    const { data, error } = await createMessageApi(message);
    setLoading(false);
    if (error) return setError(error.response?.data?.message || error.message);
    // setState((prev) => {
    //   prev.push(data);
    //   return [...prev];
    // });
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
        <Link to={`/profile/${otherUser.id}`} className={styles.userInfoButton}>
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
