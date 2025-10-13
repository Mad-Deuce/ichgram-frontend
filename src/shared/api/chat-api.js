import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const createChatApi = fetchDecorator((payload) => {
    return instance.post("posts", { ...payload })
});

export const getChatsApi = fetchDecorator(() => {
    return instance.get("chats")
});

export const createMessageApi = fetchDecorator((payload) => {
    return instance.post("messages", { ...payload })
});

export const getMessagesByChatIdApi = fetchDecorator((chatId) => {
    return instance.get(`messages/${chatId}`)
});