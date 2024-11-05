import { api } from "./api"

export const login = async (data) => {
    const res = await api.post('/login', data)
    return res.data
}