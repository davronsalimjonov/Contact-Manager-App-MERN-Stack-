import { api, paramsToString } from "./api"

export const getSellersForSelect = async (params) => {
    const res = await api.get(`/sales-manager/for-select?${paramsToString(params)}`)
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

export const setMonthlyPlan = async (data) => {
    const res = await api.patch(`/sale-statistic/set-plan`, data)
    return res.data
}

export const setGroupPlan = async (id, data) => {
    const res = await api.patch(`/sales-group/set-plan/${id}`, data)
    return res.data
}

export const setSellerPlan = async(id, data) => {
    const res = await api.put(`/sales-manager/plan/${id}`, data)
    return res.data
}

export const getSellersByGroup = async (groupId) => {
    const res = await api.get(`/sales-manager/by-group/${groupId}`)
    return res.data
}

export const changeGroupLeader = async (groupId, body) => {
    const res = await api.patch(`/sales-group/change-team-lead/${groupId}`, body)
    return res.data
}

export const transferSeller = async (sellerId, body) => {
    const res = await api.patch(`/sales-manager/change-group/${sellerId}`, body)
    return res.data
}

export const getTeamLeaderGroup = async (teamLeaderId) => {
    const res = await api.get(`/sales-group/by-team-lead/${teamLeaderId}`)
    return res.data
}

export const getSalesStatistics = async (params) => {
    const res = await api.get(`/sale-statistic?${paramsToString(params)}`)
    return res.data
}

export const getGroupsStatistics = async (params) => {
    const res = await api.get(`/sale-statistic/group?${paramsToString(params)}`)
    return res.data
}