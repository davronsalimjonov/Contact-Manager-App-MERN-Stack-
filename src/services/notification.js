import { api, paramsToString } from "./api"

export const getNotification = async (type, params) => {
    const res = await api.get(`/notification/admin/${type}?${paramsToString(params)}`)
    return res.data
}

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

export const addNotification = async (data) => {
    const res = await api.post('/notification/admin', data)
    return res.data
}


export const deleteNotification = async (notificationId) => {
    const res = await api.delete(`/notification/admin/${notificationId}`);
    return res.data
}

