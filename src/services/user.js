import { api, paramsToString } from "./api"

export const getUserById = async (userId) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

export const updateUser = async (userId, data) => {
    const res = await api.put(`/user/${userId}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const updateEmployee = async (mentorId, data, params) => {
    const res = await api.put(`/employee/${mentorId}?${paramsToString(params)}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const changeAdaptationStatus = async (userId, data) => {
    const res = await api.patch(`/employee/is-adaptation-active/${userId}`, data)
    return res.data
}