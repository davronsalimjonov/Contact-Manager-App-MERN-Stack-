import { api, paramsToString } from "./api"

export const getMentorLessonsSchedule = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/lesson-schedule/mentor/${mentorId}`)
    return res.data
}

export const createSchedule = async (data) => {
    const res = await api.post(`/lesson-schedule`, data)
    return res.data
}

export const getGroupLessonsSchedule = async (groupId) => {
    if(!groupId) return null
    const res = await api.get(`/lesson-schedule/mentor-for-create/${groupId}`)
    return res.data
}

export const updateLessonSchedule = async (scheduleId, data) => {
    const res = await api.put(`/lesson-schedule/${scheduleId}`, data)
    return res.data
}

export const createScheduleMove = async (data) => {
    const res = await api.post('/lesson-schedule/move', data)
    return res.data
}

export const deleteMovedSchedule = async (scheduleId) => {
    const res = await api.delete(`/lesson-schedule/move/${scheduleId}`)
    return res.data
}

export const getLessonStudents = async (lessonId, params) => {
    const res = await api.get(`/lesson/lesson-students-list/${lessonId}?${paramsToString(params)}`)
    return res?.data
}