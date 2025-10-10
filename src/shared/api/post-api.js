import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator"

export const createPostApi = fetchDecorator((payload) => {
    return instance.postForm("posts", { ...payload })
});

export const getLastUpdatedPostsApi = fetchDecorator(() => {
    return instance.get("posts/updates")
});

export const getPostsApi = fetchDecorator(() => {
    return instance.get("posts")
});