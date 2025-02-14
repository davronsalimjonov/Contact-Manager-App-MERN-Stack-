import { api, paramsToString } from "./api"

export const getAllAdaptation = async (params = {}) => {
    const res = await api.get(`/adaptation/for-academy-manager?${paramsToString(params)}`)
    return res.data
}