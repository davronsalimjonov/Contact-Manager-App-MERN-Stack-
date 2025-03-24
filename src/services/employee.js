import { api, paramsToString } from "./api"

export const getEmployeeById = async (employeeId, params) => {
    const res = await api.get(`/employee/${employeeId}?${paramsToString(params)}`)
    return res.data
}

export const updateEmployee = async (employeeId, data, params) => {
    const res = await api.put(`/employee/${employeeId}?${paramsToString(params)}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const createMentorEmployee = async (data) => {
    const res = await api.post(`/employee/mentor`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const updateEmployeePassword = async (mentorId, params) => {
    const res = await api.put(`/employee/change-password/by-admin/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const updateSeller = async (id, data, params = {}) => {
    const res = await api.put(`/sales-manager/${id}?${paramsToString(params)}`, data, { headers: { "Content-Type": "multipart/form-data" } })
    return res?.data
}