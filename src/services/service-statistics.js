import { api, paramsToString } from "./api"

export const getAppRate = async (params = {}) => {
    const res = await api.get(`/app-rate?${paramsToString(params)}`)
    return res.data
}

export const getMentorsRateByGroup = async (params = {}) => {
    const res = await api.get(`/lesson-rate/group-by-mentor-group?${paramsToString(params)}`)
    return res.data
}

export const getLessonsRateByGroup = async (mentorId, groupId, params = {}) => {
    const res = await api.get(`/lesson-rate/group-by-mentor-group-lesson/${mentorId}/${groupId}?${paramsToString(params)}`)
    return res.data
}

export const getLessonRate = async (lessonId, params = {}) => {
    const res = await api.get(`/lesson-rate/group-by-lesson/${lessonId}?${paramsToString(params)}`)
    return res.data
}