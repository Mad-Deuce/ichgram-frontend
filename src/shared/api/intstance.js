import axios from "axios";

const instance = axios.create({
    baseURL: "https://ich-backend-auth.onrender.com/api"
});

export default instance;