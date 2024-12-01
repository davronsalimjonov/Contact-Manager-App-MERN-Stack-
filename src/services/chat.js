import { api, paramsToString } from "./api"

export const getChatInfo = async (chatId) => {
    const res = await api.get(`/chat/student-single/${chatId}`)
    return res.data
}

export const getChatMessages = async (chatId) => {
    if(!chatId) return
    const res = await api.get(`/chat/chat-connector/${chatId}`)
    return res.data
}

export const getChatBellowMessages = async (conversationId, params) => {
    const res = await api.get(`/chat/chat-connector/bellow/${conversationId}?${paramsToString(params)}`)
    return res.data
}

export const getChatAboveMessages = async (conversationId, params) => {
    const res = await api.get(`/chat/chat-connector/above/${conversationId}?${paramsToString(params)}`)
    return res.data
}