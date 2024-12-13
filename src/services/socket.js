import { io } from "socket.io-client"

export let socket = null

export const connectSocket = (query) => {
    socket = io(import.meta.env.VITE_APP_API_URL, {
        retries: 3,
        transports: ['websocket'],
        query
    })
}