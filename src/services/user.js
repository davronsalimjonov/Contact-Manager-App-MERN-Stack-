import { api, paramsToString } from "./api"

export const getUserById = async (userId) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

export const getAllUsers = async (mentorId, params) => {
    const res = await api.get(`/user/all-students?teacher=${mentorId}&${paramsToString(params)}`)
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

export const getEmployeeById = async (mentorId, role) => {
    const res = await api.get(`/employee/${mentorId}?${paramsToString({role:role})}`);
    return res.data
}

export const getAllStudents = async (params) => {
    const filter = `/user-course/users-statistic?${paramsToString(params)}`
    const res = await api.get(filter);

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