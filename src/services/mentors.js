import { api, paramsToString } from "./api";

export const getMainMentors = async (params) => {
    const res = await api.get(`/statistic/mentors/academy-statistic?${paramsToString(params)}`);
    return res.data;
}

export const getCallMentors = async (params) => {
    const res = await api.get(`/statistic/mentors/call-mentor-statistic?${paramsToString(params)}`);
    return res.data;
}

export const getMentors = async (role)=> {
    const res= await api.get(`/employee/all-mentors/for-select?${paramsToString({role:role})}`);
    return res.data;
}

export const getAllMentors = async (params) => {
    const res = await api.get(`/employee/all-mentors?${paramsToString(params)}`)
    return res.data
}

export const getSingleMentor = async (mentorId, params) => {
    const res = await api.get(`/employee/${mentorId}?${paramsToString(params)}`,  )
    return res.data
}

export const updateMentors = async (mentorId, data) => {
    const res = await api.put(`/employee/${mentorId}`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}

export const createMentors = async (data) => {
    const res = await api.post(`/employee/mentor`, data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}