import { api, paramsToString } from "./api"

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

export const getCallMentorStatistic = async (mentorId, params) => {
    const res = await api.get(`/statistic/mentors/call-mentor-statistic/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getMainMentorStatistic = async (mentorId, params) => {
    const res = await api.get(`/statistic/mentors/academy-statistic/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getStudentsCountByStatus = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-status?${paramsToString(params)}`)
    return res.data
}

export const getActiveStudentsCount = async (params) => {
    const res = await api.get(`/statistic/active-students?${paramsToString(params)}`)
    return res.data
}

export const getAcademyManagerStatistics = async (params) => {
    const res = await api.get(`/statistic/academy-manager-card-statistic?${paramsToString(params)}`)
    return res.data
}

export const getSoldCoursesCountStatistic = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-new-for-admin?${paramsToString(params)}`)
    return res.data
}

export const getMentorSalary = async (mentorId, role, params) => {
    const res = await api.get(`/statistic/mentors/mentor-salary/${role}/${mentorId}?${paramsToString(params)}`)
    return res.data
}