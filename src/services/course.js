import { api, paramsToString } from "./api"

export const getCallMentorStudents = async (mentorId, params) => {
    if (!mentorId) return null
    const res = await api.get(`/user-course/call-mentor-panel/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getMentorGroups = async (mentorId) => {
    if (!mentorId) return null
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

export const getCourses = async () => {
    const res = await api.get(`/course/for-select`);
    return res.data
}

export const getAllCourses = async () => {
    const res = await api.get(`/course`);
    return res.data
}

export const getStudentCourses = async (studentId) => {
    const res = await api.get(`/user-course/courses-web/${studentId}`)
    return res.data;
}

export const getCourseById = async (courseId) => {
    const res = await api.get(`/course/${courseId}`);
    return res.data;
}

export const addCourse = async (data) => {
    const res = await api.post('/course', data)
    return res.data
}


export const updateCourse = async (courseId, data) => {
    const res = await api.put(`/course/${courseId}`, data)
    return res.data
}

export const addDiscount = async (data) => {
    const res = await api.post(`/course-price`, data);
    return res.data;
}


export const getCourseRate = async (courseId, params) => {
    const res = await api.get(`/course-rate/for-web/${courseId}?${paramsToString(params)}`)
    return res.data
}

export const changeIsActiveCourseRate = async (commentId, isActive) => {
    const res = await api.put(`/course-rate/is-active/${commentId}`, { isActive: isActive });
    return res.data;
}