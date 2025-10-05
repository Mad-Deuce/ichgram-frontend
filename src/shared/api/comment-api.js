import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const createCommentApi = fetchDecorator((payload) => {
    return instance.post("comments", { ...payload })
});

