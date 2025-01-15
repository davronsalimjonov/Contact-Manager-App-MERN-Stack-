import { api, paramsToString } from "./api"

export const getSellerStudents = async (sellerId, params) => {
    const res = await api.get(`/user-course/sales-manager-panel/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const getSaleStatistic = async (sellerId, params) => {
    const res = await api.get(`/sales-manager/sale-statistic/${sellerId}?${paramsToString(params)}`)
    return res?.data
}

export const getSellerMetrics = async (sellerId) => {
    const res = await api.get(`/sales-manager/sale-dashboard/${sellerId}`)
    return res?.data
}