import { api, paramsToString } from "./api"

export const getMentorCallCount = async (mentorId, params) => {
    const res = await api.get(`/audio-call/mentor/call-count/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getStudentCountByCourse = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-course?${paramsToString(params)}`)
    return res.data
}

export const getStudentCountByLevel = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-level?${paramsToString(params)}`)
    return res.data
}

export const getNewStudentsCount = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-new?${paramsToString(params)}`)
    return res.data
}

export const getRating = async (mentorId, params) => {
    const res = await api.get(`/call-rate/teachers/statistic/${mentorId}?${paramsToString(params)}`)
    return res.data
}