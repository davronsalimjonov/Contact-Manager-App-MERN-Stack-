import { api, paramsToString } from "./api"

export const getAllAdaptation = async (params = {}) => {
    const res = await api.get(`/adaptation/for-academy-manager?${paramsToString(params)}`)
    return res.data
}

export const changeAdaptationMentor = async (data) => {
    const mentor = data?.mentor
    const res = await api.put(`/adaptation/mentor/${data?.id}`, {mentor: mentor})
}