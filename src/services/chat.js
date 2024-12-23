import { api, paramsToString } from "./api"

export const getChatInfo = async (chatId) => {
    const res = await api.get(`/chat/student-single/${chatId}`)
    return res.data
}

export const getChatMessages = async (chatId) => {
    if (!chatId) return
    const res = await api.get(`/chat/chat-connector/${chatId}`)
    return [res.data]
}

export const getChatBellowMessages = async (conversationId, params) => {
    const res = await api.get(`/chat/chat-connector/bellow/${conversationId}?${paramsToString(params)}`)
    return res.data
}

export const getChatAboveMessages = async (conversationId, params) => {
    const res = await api.get(`/chat/chat-connector/above/${conversationId}?${paramsToString(params)}`)
    return res.data
}

export const createTextMessage = async (data) => {
    const res = await api.post('/message/text', data)
    return res.data
}

export const createComment = async (data) => {
    const res = await api.post('/user-comment', data)
    return res.data
}

export const createSms = async (userId, data) => {
    const res = await api.post(`/user/send-sms/user/${userId}`, data)
    return res.data
}

export const createLessonTask = async (fd) => {
    const res = await api.post('/home-task', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res.data
}

export const updateHomeTask = async (taskId, data) => {
    const res = await api.put(`/home-task/${taskId}`, data, {headers: {'Content-Type': 'multipart/form-data'}})
    return res.data
}

export const updateHomeWork = async (taskId, data) => {
    const res = await api.put(`/student-home-work/${taskId}`, data)
    return res.data
}

export const sendViewedMessages = async (chatId, data) => {
    const res = await api.put(`/chat/is-viewed/${chatId}`, data)
    return res.data
}