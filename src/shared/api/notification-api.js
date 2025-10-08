import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"


export const getLastNotificationsApi = fetchDecorator(() => {
    return instance.get("notifications")
});