import { api, paramsToString } from "./api"

export const getChatInfo = async (studentId, courseId) => {
    const res = await api.get(`/chat/student-single/${studentId}/${courseId}`)
    return res.data
}

export const getChatMessages = async (chatId) => {
    if(!chatId) return
    const res = await api.get(`/chat/chat-connector/${chatId}`)
    return res.data
}

export const getChatBellowMessages = async (chatId, params) => {
    const res = await api.get(`/chat/chat-connector/bellow/${chatId}?${paramsToString(params)}`)
    return res.data
}

export const getChatAboveMessages = async () => {
    const res = await api.get(`/chat/chat-connector/above/${chatId}`)
}