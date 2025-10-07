import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const followUserApi = fetchDecorator((payload) => {
    return instance.post("follows", { ...payload })
});

