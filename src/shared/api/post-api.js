import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const createPostApi = fetchDecorator((payload) => {
    return instance.postForm("posts", {...payload})
});