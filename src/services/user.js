import { api } from "./api"

export const getUserById = async (userId) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

export const updateUser = async (userId, data) => {
    const res = await api.put(`/user/${userId}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const updateEmployee = async (mentorId, data) => {
    const res = await api.put(`/employee/${mentorId}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}