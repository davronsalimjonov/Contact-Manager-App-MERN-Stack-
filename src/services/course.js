import { api, paramsToString } from "./api"

export const getCallMentorStudents = async (mentorId, params) => {
    const res = await api.get(`/user-course/call-mentor-panel/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getMentorGroups = async (mentorId) => {
    const res = await api.get(`/group/mentor-groups/${mentorId}`)
    return res.data
}