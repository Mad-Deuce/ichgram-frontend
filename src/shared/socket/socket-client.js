import { io } from "socket.io-client";

const { VITE_WEBSOCKET_URL: socketURL } = import.meta.env;

export const Socket = (function () {
    let _instance;

    function createInstance() {
        const socket = io(`${socketURL}`, {
            withCredentials: true,
        });
        socket.on("connect", function () {
            console.log("Socket connected", socket.connected);
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            console.log("Socket connected", socket.connected);
            _instance = null;
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

