import instance from "./intstance";

const setToken = token => {
    if(token) {
        return instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    delete instance.defaults.headers["Authorization"];
}

export const registerUserApi = async payload => {
    const {data} = await instance.post("/auth/register", payload);
    setToken(data.token);
    return data;
}

export const getCurrentUserApi = async token => {
    setToken(token);
    try {
        const {data} = await instance.get("/auth/current");
        return data;
    }
    catch (error) {
        setToken();
        throw error;
    }
}

export const loginUserApi = async payload => {
    const {data} = await instance.post("/auth/login", payload);
    setToken(data.token);
    return data;
}

export const logoutUserApi = async ()=> {
    const {data} = await instance.post("/auth/logout");
    setToken();
    return data;
}