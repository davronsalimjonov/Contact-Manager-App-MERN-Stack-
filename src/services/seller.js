import { api, paramsToString } from "./api"

export const getSellerStudents = async (sellerId, params) => {
    const res = await api.get(`/user-course/sales-manager-panel/${sellerId}?${paramsToString(params)}`)
    return res?.data
}