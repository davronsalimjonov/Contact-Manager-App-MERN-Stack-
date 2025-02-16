import { api, paramsToString } from "./api"

export const getUserById = async (userId) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

export const getAllUsers = async (params) => {
    const res = await api.get(`/user/all-students?${paramsToString(params)}`)
    return res.data
}

export const updateUser = async (userId, data) => {
    const res = await api.put(`/user/${userId}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const addStudent= async (data)=>{
    const res = await api.post('/user/student',data);
    return res.data;
}

export const updateUserPassword = async (id, params) => {
    const res = await api.put(`/user/change-password/by-admin/${id}?${paramsToString(params)}`)
    return res.data
}

export const changeAdaptationStatus = async (userId, data) => {
    const res = await api.patch(`/adaptation/active/mentor/${userId}`, data)
    return res.data
}