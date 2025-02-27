import { api } from "./api"

export const createReminder = async (data) => {
    const res = await api.post('/teacher-notification', data)
    return res.data
}