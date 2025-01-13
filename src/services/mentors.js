import { api, paramsToString } from "./api"

export const getCallMentors = async (params) => {
    const res = await api.get(`/employee/all-mentors/for-select?${paramsToString(params)}`)
    return res.data
}

export const getAllMentors = async (params) => {
    const res = await api.get(`/employee/all-mentors?${paramsToString(params)}`)
    return res.data
}

export const getSingleMentor = async (id, role) => {
    const res = await api.get(`/employee/${id}?${role}`)
    return res.data
}