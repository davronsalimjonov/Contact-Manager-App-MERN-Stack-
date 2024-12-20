import { api } from "./api"

export const createGroups = async (data) => {
    const res = await api.post(`/group`, data)
    return res.data
}

