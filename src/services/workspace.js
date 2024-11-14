import { api } from "./api"

export const getWorkspace = async (mentorId) => {
    const res = await api.get(`/workspace/call-mentor/${mentorId}`)
    return res.data
}

export const updateWorkspaceStatus = async (workspaceId, data) => {
    const res = await api.put(`/workspace/status/${workspaceId}`, data)
    return res.data
}