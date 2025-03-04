import { api } from "./api"

export const getNotifications = async () => {
    const res = await api.get(`/teacher-notification/inbox`)
    return res.data
}

export const getNotificationCount = async () => {
    const res = await api.get(`/teacher-notification/teacher/notification-count/`)
    return res.data
}

export const setIsViewedNotifications = async (data) => {
    const res = await api.put(`/teacher-notification/is-viewed`, data)
    return res.data
}