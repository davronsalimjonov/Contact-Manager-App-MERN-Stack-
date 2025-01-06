import { api, paramsToString } from "./api";

export const getFilterWords = async (params) => {
    const filter = `/perfectly-dictionary/web?${paramsToString(params)}`
    const res = await api.get(filter);

    return res.data
}

export const addNewWord = async (data) => {
    const res = await api.post(`/perfectly-dictionary/`, data);
    return res.data
}

export const getWordById = async (wordId) => {
    const res = await api.get(`/perfectly-dictionary/${wordId}`)
    return res.data
}

export const updateWord = async (wordId, data) => {
    const res = await api.put(`/perfectly-dictionary/${wordId}`, data)
    return res.data
}

export const deleteWord = async (wordId) => {
    const res = await api.delete(`/perfectly-dictionary/${wordId}`);
    return res.data
}