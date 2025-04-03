import { api, paramsToString } from "./api"

export const getQualityControlEmployees = async (data) => {
    const res = await api.get(`/quality-manager?${paramsToString(data)}`)
    return res.data
}