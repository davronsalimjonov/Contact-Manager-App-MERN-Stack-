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

export const createLessonHomeWork = async (data) => {
    const res = await api.post(`/lesson-home-task`, data)
    return res?.data
}

export const getStudentLessonHomework = async (homeworkId) => {
    const res = await api.get(`/lesson-home-task/for-check/${homeworkId}`)
    return res?.data
}

export const rateLessonHomeWork = async (homeworkId, data) => {
    const res = await api.put(`/lesson-home-task/rate-lesson-home-work/${homeworkId}`, data)
    return res?.data
}