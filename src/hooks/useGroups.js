import { getActiveGroups, getGroupsByLevel } from "@/services/group"
import { removeEmptyKeys } from "@/utils/lib"
import { useQuery } from "react-query"

export const useGetGroupsByLevel = (level, params) => {
    return useQuery(['groups', level, ...Object.values(removeEmptyKeys(params))], () => getGroupsByLevel({level, ...params}), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetActiveGroups = (params, enabled = true) => {
    return useQuery(['active-groups', ...Object.values(removeEmptyKeys(params))], () => getActiveGroups(params), { cacheTime: Infinity, staleTime: Infinity, enabled })
}