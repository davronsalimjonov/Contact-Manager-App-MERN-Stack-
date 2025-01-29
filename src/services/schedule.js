import { api } from "./api"

export const getMentorLessonsSchedule = async (mentorId) => {
    if(!mentorId) return null
    const res = await api.get(`/lesson-schedule/mentor/${mentorId}`)
    return res.data
}