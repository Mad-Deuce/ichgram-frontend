import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectUser } from "/src/redux/auth/auth-selectors";

import ChatCard from "./ChatCard/ChatCard";
import Messenger from "./Messenger/Messenger";

import styles from "./Chat.module.css";

export default function Chat({ chats, initChat }) {
  const currentUser = useSelector(selectUser);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    setActiveChat(initChat);
  }, [initChat]);

  const handleClickOnChat = (chat) => {
    setActiveChat(chat);
  };

  const chatElements = chats?.map((chat) => (
    <ChatCard
      key={chat.id}
      chat={chat}
      active={chat.id === activeChat?.id ? true : false}
      handleClick={handleClickOnChat}
      currentUser={currentUser}
    />
  ));

  return (
    <div className={styles.chat}>
      <div className={styles.chatsWrapper}>
        <div className={styles.chatsHeader}>
          <p className={styles.chatsHeaderUsername}>{currentUser.username}</p>
        </div>
        <div className={styles.chats}>{chatElements}</div>
      </div>
      {activeChat && <Messenger chat={activeChat} currentUser={currentUser} />}
    </div>
  );
}
