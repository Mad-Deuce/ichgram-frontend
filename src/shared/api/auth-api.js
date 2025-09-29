import instance from "./instance";
import { fetchDecorator } from "/src/shared/utils/fetchDecorator";

const setToken = token => {
    if (token) {
        return instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    delete instance.defaults.headers["Authorization"];
}

export const signupUserApi = async payload => {
    const { data } = await instance.post("/auth/signup", payload);
    return data;
}

export const confirmEmailApi = fetchDecorator((token) => instance.get("/auth/verify", { params: { token } }));

export const loginUserApi = async payload => {
    const { data } = await instance.post("/auth/login", payload);
    return data;
}

export const getCurrentUserApi = async token => {
    setToken(token);
    try {
        const { data } = await instance.get("/auth/current");
        return data;
    }
    catch (error) {
        setToken();
        throw error;
    }
}



export const logoutUserApi = async () => {
    const { data } = await instance.post("/auth/logout");
    setToken();
    return data;
}

export const resetPasswordApi = async payload => {
    const { data } = await instance.post("/auth/reset", payload);
    return data;
}

export const updatePasswordApi = async ({ values, resetToken }) => {
    setToken(resetToken);
    const { data } = await instance.put("/auth/reset", values);
    setToken(data.token);
    return data;
}