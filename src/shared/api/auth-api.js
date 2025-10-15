import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator";

export const signupUserApi = async payload => {
    const { data } = await instance.post("/auth/signup", payload);
    return data;
}

export const confirmEmailApi = fetchDecorator((token) => instance.get("/auth/verify", { params: { token } }));

export const loginUserApi = async payload => {
    const { data } = await instance.post("/auth/login", payload);
    return data;
}

export const resetPasswordApi = async payload => {
    const { data } = await instance.post("/auth/reset", payload);
    return data;
}

export const updatePasswordApi = async ({ values, token }) => {
    const { data } = await instance.put("/auth/update", values, { params: { token } });
    return data;
}


export const getCurrentUserApi = async () => {
    const { data } = await instance.get("/auth/current");
    return data;
}

export const refreshTokensApi = async () => {
    const { data } = await instance.get("/auth/refresh");
    return data;
}


export const logoutUserApi = async () => {
    const { data } = await instance.get("/auth/logout");
    return data;
}

