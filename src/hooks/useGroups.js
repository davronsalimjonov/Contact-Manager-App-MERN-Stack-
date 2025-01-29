import { getGroupsByLevel } from "@/services/group"
import { removeEmptyKeys } from "@/utils/lib"
import { useQuery } from "react-query"

export const useGetGroupsByLevel = (level, params) => {
    return useQuery(['groups', level, ...Object.values(removeEmptyKeys(params))], () => getGroupsByLevel({level, ...params}), { cacheTime: Infinity, staleTime: Infinity })
}