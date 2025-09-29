import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});



instance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                await instance.get('/auth/refresh');
                return instance(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is.
    }
);


export default instance;