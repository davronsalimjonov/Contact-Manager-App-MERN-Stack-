import { api } from "./api"

export const login = async (data) => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const getUserInfo = async () => {
    const res = await api.get('/user/me')
    return res.data
}