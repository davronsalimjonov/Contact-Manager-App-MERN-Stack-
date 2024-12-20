import { api, paramsToString } from "./api"

export const getCallMentors = async (params) => {
    const res = await api.get(`/employee/all-mentors/for-select?${paramsToString(params)}`)
    return res.data
}