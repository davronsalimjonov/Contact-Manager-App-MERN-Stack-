import { api, paramsToString } from "./api"

export const getGroupsByLevel = async (params = {}) => {
    const res = await api.get(`/group/by-level/?${paramsToString(params)}`)
    return res.data
}

export const getActiveGroups = async (params = {}) => {
    const res = await api.get(`/group/active/?${paramsToString(params)}`)
    return res.data
}

export const addStudentToGroup = async (data) => {
    const res = await api.post(`/group/add-student`, data)
    return res.data
}

export const getGroupInfo = async (groupId) => {
    const res = await api.get(`/group/${groupId}`)
    return res.data
}

export const getGroupStudents = async (groupId, params = {}) => {
    const res = await api.get(`/lesson/students/group/${groupId}?${paramsToString(params)}`)
    return res.data
}

export const transferStudent = async (data) => {
    const res = await api.post('/group/transfer-student', data)
    return res.data
}