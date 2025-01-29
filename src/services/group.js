import { api, paramsToString } from "./api"

export const getGroupsByLevel = async (params = {}) => {
    const res = await api.get(`/group/by-level/?${paramsToString(params)}`)
    return res.data
}