import { api, paramsToString } from "./api"

export const createMaterial = async (data) => {
    const res = await api.post('/material', data)
    return res.data
}

export const getMentorMaterials = async (mentorId, params) => {
    const res = await api.get(`/material/mentor/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const updateMaterial = async (materialId, data) => {
    const res = await api.put(`/material/${materialId}`, data)
    return res.data
}

export const deleteMaterial = async (materialId) => {
    const res = await api.delete(`/material/${materialId}`)
    return res.data
}