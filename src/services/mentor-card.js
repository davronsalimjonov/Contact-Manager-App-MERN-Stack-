import { api } from "./api"

export const createMentorCard = async (data) => {
    const res = await api.post('/mentor-card', data)
    return res.data
}