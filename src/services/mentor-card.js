import { api } from "./api"

export const createMentorCard = async (data) => {
    const res = await api.post('/mentor-card', data)
    return res.data
}

export const viewMentorCard = async (cardId) => {
    const res = await api.patch(`/mentor-card/is-viewed/${cardId}`)
    return res.data
}