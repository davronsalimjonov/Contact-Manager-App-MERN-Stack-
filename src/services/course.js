import { api, paramsToString } from "./api"

export const getCallMentorStudents = async (mentorId, params) => {
    if(!mentorId) return null
    const res = await api.get(`/user-course/call-mentor-panel/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getCourseForSelect = async () => {
    const res = await api.get(`/course/for-select`);
    return res.data
}

export const getMentorGroups = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/group/mentor-groups/${mentorId}`)
    return res.data
}

export const getUserCourseById = async (courseId) => {
    const res = await api.get(`/user-course/single-course-for-web/${courseId}`)
    return res.data
}

export const updateUserCourse = async (courseId, data) => {
    const res = await api.put(`/user-course/${courseId}`, data)
    return res.data
}