import { useCallback } from "react";

import useFetch from "/src/shared/hooks/temp/useFetch";
import { getChatsApi } from "/src/shared/api/chat-api";

import Chat from "/src/modules/Chat/Chat";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const getChatsApiCallback = useCallback(() => getChatsApi(), []);

  const { state, loading, error } = useFetch(getChatsApiCallback, []);

  return (
    <div className={styles.chatPage}>
      <LoadingErrorOutput loading={loading} error={error} />
      <Chat chats={state} />
    </div>
  );
}
