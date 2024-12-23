import { api, paramsToString } from "./api"

export const getNotification = async (type, params) => {
    const res = await api.get(`/notification/admin/${type}?${paramsToString(params)}`)
    return res.data
}

export const getNotifications = async (userId) => {
    const res = await api.get(`/teacher-notification/teacher/${userId}`)
    return res.data
}

export const getNotificationCount = async (userId) => {
    const res = await api.get(`/teacher-notification/teacher/notification-count/${userId}`)
    return res.data
}