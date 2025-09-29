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

instance.interceptors.request.use(request => {
    if (request.data && typeof request.data === 'object') {
        const cleanedData = {};
        for (const key in request.data) {
            const value = request.data[key];
            // Exclude null, undefined, and empty strings
            if (value !== null && value !== undefined && value !== '') {
                cleanedData[key] = value;
            }
        }
        request.data = cleanedData;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

export default instance;