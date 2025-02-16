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

export const getLessonRate = async (mentorId, params) => {
    const res = await api.get(`/lesson-rate/teachers/statistic/${mentorId}?${paramsToString(params)}`);
    return res.data
}

export const getLessonRateStatistic = async (params) => {
    const res = await api.get(`/lesson-rate/teachers/statistic?${paramsToString(params)}`);
    return res.data;
}

export const getCallRateStatistic = async (params) => {
    const res = await api.get(`/call-rate/teachers/statistic?${paramsToString(params)}`);
    return res.data;
}


export const getStudentsRateForCallMentor = async (params) => {
    const res = await api.get(`/call-rate?${paramsToString(params)}`);
    return res.data;
}

export const getStudentsRateForTeacher = async (teacherId, groupId, params) => {
    const res = await api.get(`/lesson-rate/teacher/${teacherId}/${groupId}?${paramsToString(params)}`);
    return res.data;
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