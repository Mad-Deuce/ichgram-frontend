import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const findUsersApi = fetchDecorator((payload) => {
    return instance.get("users/search", { params: { ...payload } })
});

