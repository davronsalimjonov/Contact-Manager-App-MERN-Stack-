import { api, paramsToString } from "./api";

export const getMainMentors = async (params) => {
    const res = await api.get(`/statistic/mentors/academy-statistic?${paramsToString(params)}`);
    return res.data;
}


export const getCallMentors = async (params) => {
    const res = await api.get(`/employee/all-mentors/for-select?${paramsToString(params)}`);
    return res.data;
}

export const getMentors = async (role)=> {
    const res= await api.get(`/employee/all-mentors/for-select?${paramsToString({role:role})}`);
    return res.data;
}