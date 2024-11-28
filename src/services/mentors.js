import { api, paramsToString } from "./api";

export const getMainMentors = async (params) => {
    const res = await api.get(`/statistic/mentors/academy-statistic?${paramsToString(params)}`);
    return res.data;
}