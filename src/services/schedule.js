import { api, paramsToString } from "./api"

export const getSchedule = async (params) => {
    const res = await api.get(`/lesson-schedule/?${paramsToString(params)}`)
    return res.data;
}
export const getScheduleById = async (scheduleId) => {
    console.log("work");
    const res = await api.get(`/lesson-schedule/${scheduleId}`)
    return res.data
}
export const updateSchedule = async (scheduleId, data) => {
    const res = await api.put(`/lesson-schedule/${scheduleId}`, data)
    return res.data
}
export const addNewSchedule = async (data) => {
    const res = await api.post(`/lesson-schedule/`, data);
    return res.data
}

export const getMentorLessonsSchedule = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/lesson-schedule/mentor/${mentorId}`)
    return res.data
}

export const getMentorGroupLesson = async (groupId) => {
    if (!groupId) return null
    const res = await api.get(`/lesson/group/${groupId}`)
    return res.data
}

export const createGroupLesson = async (data) => {
    const res = await api.post(`/lesson`, data)
    return res?.data
}

export const getSingleLesson = async (lessonId) => {
    const res = await api.get(`/lesson/${lessonId}`)
    return res?.data
}

export const createHomeWork = async (data) => {
    const res = await api.post(`/lesson-home-task`, data)
    return res?.data
}

export const updateHomeWork = async ({id, data}) => {
    const res = await api.put(`/lesson-home-task/${id}`, data)
    return res?.data
}

export const getLessonStudents = async (lessonId, params) => {
    const res = await api.get(`/lesson/lesson-students-list/${lessonId}?${paramsToString(params)}`)
    return res?.data
}

export const getSingleHomeTask = async (lessonHomeTaskId) => {
    const res = await api.get(`/lesson-home-task/${lessonHomeTaskId}`)
    return res?.data
}

export const getStudentSubmit = async (lessonStudentId) => {
    const res = await api.get(`/lesson-home-task/for-check/${lessonStudentId}`)
    return res?.data
}

export const rateStudentSubmit = async (data) => {
    const lessonHomeWorkId = data?.id
    delete data?.id
    const res = await api.put(`/lesson-home-task/rate-lesson-home-work/${lessonHomeWorkId}`, data)
    return res?.data
}