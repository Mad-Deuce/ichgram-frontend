import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

/*

instance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                // const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
                // Make a request to your auth server to refresh the token.
               await instance.get('/refresh');
                // const { accessToken, refreshToken: newRefreshToken } = response.data;
                // Store the new access and refresh tokens.
                // localStorage.setItem('accessToken', accessToken);
                // localStorage.setItem('refreshToken', newRefreshToken);
                // Update the authorization header with the new access token.
                // instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return instance(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error('Token refresh failed:', refreshError);
                // localStorage.removeItem('accessToken');
                // localStorage.removeItem('refreshToken');
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is.
    }
);

*/
export default instance;