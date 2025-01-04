import { api } from "./api"

export const getNotifications = async (userId) => {
    const res = await api.get(`/teacher-notification/teacher/${userId}`)
    return res.data
}

export const getNotificationCount = async (userId) => {
    const res = await api.get(`/teacher-notification/teacher/notification-count/${userId}`)
    return res.data
}

export const setIsViewedNotifications = async (data) => {
    const res = await api.put(`/teacher-notification/is-viewed`, data)
    return res.data
}