import { getActiveGroups, getGroupInfo, getGroupsByLevel, getGroupStudents } from "@/services/group"
import { removeEmptyKeys } from "@/utils/lib"
import { useQuery } from "react-query"

export const useGetGroupsByLevel = (level, params = {}) => {
    return useQuery(['groups', level, ...Object.values(removeEmptyKeys(params))], () => getGroupsByLevel({level, ...params}), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetActiveGroups = (params, enabled = true) => {
    return useQuery(['active-groups', ...Object.values(removeEmptyKeys(params))], () => getActiveGroups(params), { cacheTime: Infinity, staleTime: Infinity, enabled })
}

export const useGetGroupInfo = (groupId) => {
    return useQuery(['group-info', groupId], () => getGroupInfo(groupId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupStudents = (groupId, params = {}) => {
    return useQuery(['group-students', groupId, ...Object.values(removeEmptyKeys(params))], () => getGroupStudents(groupId, params), { cacheTime: Infinity, staleTime: Infinity })
}