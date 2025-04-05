import { api, paramsToString } from "./api"

export const getQualityControlEmployees = async (data) => {
    const res = await api.get(`/quality-manager?${paramsToString(data)}`)
    return res.data
}

export const createQualityControlEmployee = async (data) => {
    const res = await api.post('/quality-manager', data, { headers: { "Content-Type": 'multipart/form-data' } })
    return res.data
}