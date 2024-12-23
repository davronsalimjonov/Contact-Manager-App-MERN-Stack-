import { api } from "./api"

export const createTask = async (data) => {
    const res = await api.post('/task', data)
    return res.data
}

export const getUncompletedMentorTasks = async () => {
    const res = await api.get(`/task/uncompleted/mentor`)
    return res.data
}

export const getUncompletedChatTasks = async (chatId) => {
    const res = await api.get(`/task/uncompleted/mentor/${chatId}`)
    return res.data
}

export const updateTaskStatus = async (taskId) => {
    const res = await api.put(`/task/is-completed/${taskId}`)
    return res.data
}

export const updateTask = async (taskId, data) => {
    const res = await api.put(`/task/${taskId}`, data)
    return res.data
}