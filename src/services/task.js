import { api } from "./api"

export const createTask = async (data) => {
    const res = await api.post('/task', data)
    return res.data
}

export const getUncompletedTasks = async (chatId) => {
    const res = await api.get(`/task/uncompleted/mentor/${chatId}`)
    return res.data
}