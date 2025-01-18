import { api, paramsToString } from "./api"

export const getCallMentorStudents = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/user-course/call-mentor-panel/${mentorId}`)
    return res.data
}

export const getMentorGroups = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/group/mentor-groups/${mentorId}`)
    return res.data
}

export const getMentorStudents = async (mentorId, params) => {
    if(!mentorId) return null
    const res = await api.get(`/user-course/academy-mentor-panel/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getUserCourseById = async (courseId) => {
    const res = await api.get(`/user-course/single-course-for-web/${courseId}`)
    return res.data
}

export const updateUserCourse = async (id, data) => {
    const res = await api.put(`/user-course/${id}`, data)
    return res
}

export const addUserCourse = async (data) => {
    const res = await api.post(`/user-course/add-course-to-user`, data)
    return res
}

export const getCourseForSelect = async () => {
    const res = await api.get(`/course/for-select`)
    return res.data
}