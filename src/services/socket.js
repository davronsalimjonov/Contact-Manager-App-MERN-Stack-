import { io } from "socket.io-client"

export let socket = null

export const connectSocket = (query) => {
    socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
        query
    })
}