import { io } from "socket.io-client";

const { VITE_WEBSOCKET_URL: socketURL } = import.meta.env;

export const Socket = (function () {
    let _instance;

    function createInstance() {
        const socket = io(`${socketURL}`, {
            withCredentials: true,
        });
        return socket;
    }

    return {
        getInstance: function () {
            if (!_instance) {
                _instance = createInstance();
            }
            return _instance;
        },
    };
})();

