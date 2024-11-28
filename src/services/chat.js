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

export const getChatBellowMessages = async (chatId, params) => {
    const res = await api.get(`/chat/chat-connector/bellow/${chatId}?${paramsToString(params)}`)
    return res.data
}

export const getChatAboveMessages = async (chatId, params) => {
    const res = await api.get(`/chat/chat-connector/above/${chatId}?${paramsToString(params)}`)
    return res.data
}