import { api, paramsToString } from "./api"

export const getSchedule = async (params) => {
    const res = await api.get(`/lesson-schedule/?${paramsToString(params)}`)
    return res.data;
}
export const getScheduleById = async (scheduleId) => {
    console.log("work");
    const res = await api.get(`/lesson-schedule/${scheduleId}`)
    return res.data
}
export const updateSchedule = async (scheduleId, data) => {
    const res = await api.put(`/lesson-schedule/${scheduleId}`, data)
    return res.data
}
export const addNewSchedule = async (data) => {
    const res = await api.post(`/lesson-schedule/`, data);
    return res.data
}