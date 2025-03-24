import { api } from "./api"

export const getSellersForSelect = async () => {
    const res = await api.get('/sales-manager/for-select')
    return res.data
}

export const getSalesGroups = async () => {
    const res = await api.get('/sales-group')
    return res.data
}

export const createSalesGroup = async (data) => {
    const res = await api.post('/sales-group', data, { headers: { "Content-Type": "multipart/form-data" } })
    return res.data
}

export const updateSalesGroup = async (id, data) => {
    const res = await api.put(`/sales-group/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
    return res.data
}