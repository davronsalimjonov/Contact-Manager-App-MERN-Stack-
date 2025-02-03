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