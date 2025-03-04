import { useQuery } from "react-query"
import { USER_ROLES } from "@/constants"
import { removeEmptyKeys } from "@/utils/lib"
import { getCallMentorsStatistic, getMainMentorsStatistic, getMentors, getMentorsForOptions } from "@/services/mentors"

export const useGetMentors = (params = {}, options = {}) => {
    return useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getMentors(params), { cacheTime: Infinity, staleTime: Infinity, ...options })
}

export const useGetMentorsForOptions = (options = {}) => {
    const callMentors = useQuery(['call-mentors'], () => getMentorsForOptions(USER_ROLES.CALL_MENTOR), { cacheTime: Infinity, staleTime: Infinity, ...options })
    const mainMentors = useQuery(['main-mentors'], () => getMentorsForOptions(USER_ROLES.MAIN_MENTOR), { cacheTime: Infinity, staleTime: Infinity, ...options })
    return { callMentors, mainMentors }
}

export const useGetMainMentorsStatistic = (params = {}) => {
    return useQuery(['main-mentors-statistic', ...Object.values(removeEmptyKeys(params))], () => getMainMentorsStatistic(params), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetCallMentorsStatistic = (params = {}) => {
    return useQuery(['call-mentor-statistic', ...Object.values(removeEmptyKeys(params))], () => getCallMentorsStatistic(params), { staleTime: Infinity, cacheTime: Infinity })
}