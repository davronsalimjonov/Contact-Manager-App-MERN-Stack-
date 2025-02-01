import { api } from "./api"

export const getStudentsForAdaptation = async (mentorId) => {
    const res = await api.get(`/adaptation/mentor/${mentorId}`)
    return res.data
}

export const updateStudentAdaptationStatus = async (userId, data) => {
    const res = await api.put(`/adaptation/status/${userId}`, data)
    return res.data
}