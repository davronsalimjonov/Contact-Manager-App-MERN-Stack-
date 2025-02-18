import { api } from "./api"

export const createLesson = async (data) => {
    const res = await api.post(`/lesson`, data)
    return res?.data
}

export const getGroupLessons = async (groupId) => {
    if (!groupId) return null
    const res = await api.get(`/lesson/group/${groupId}`)
    return res.data
}

export const getLessonInfo = async (lessonId) => {
    const res = await api.get(`/lesson/${lessonId}`)
    return res?.data
}