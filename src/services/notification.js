import { api, paramsToString } from "./api"

export const getNotification = async (type, params) => {
    const res = await api.get(`/notification/admin/${type}?${paramsToString(params)}`)
    return res.data
}
