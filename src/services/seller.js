import { api, paramsToString } from "./api"

export const getSellerStudents = async (sellerId, params) => {
    const res = await api.get(`/user-course/sales-manager-panel/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const getSaleStatistic = async (sellerId, params) => {
    const res = await api.get(`/sales-manager/sale-statistic/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const getSellerMetrics = async (sellerId, params) => {
    const res = await api.get(`/sales-manager/sale-dashboard/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const createSellerStudent = async (data) => {
    const res = await api.post(`/user-course/create-sales-form`, data, { headers: { "Content-Type": "multipart/form-data" } })
    return res?.data
}

export const updateSellerPlan = async (sellerId, data) => {
    const res = await api.put(`/sales-manager/plan/${sellerId}`, data)
    return res?.data
}

export const getSellerInvoice = async (sellerId, params = {}) => {
    const res = await api.get(`/sales-manager/invoice/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const updateSeller = async (sellerId, data) => {
    const res = await api.put(`/sales-manager/${sellerId}`, data, {headers: { "Content-Type": "multipart/form-data" }})
    return res?.data
}