import { api, paramsToString } from "./api"

export const getAllAdaptation = async (params = {}) => {
    const res = await api.get(`/adaptation/for-academy-manager?${paramsToString(params)}`)
    return res.data
}

export const changeAdaptationMentor = async (adaptationId, body) => {
    const res = await api.put(`/adaptation/mentor/${adaptationId}`, body)
    return res.data
}

export const getFinishedAdaptations = async (params = {}) => {
    const res = await api.get(`/adaptation/finished?${paramsToString(params)}`)
    return res.data
}