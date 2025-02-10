import { useQuery } from "react-query"
import { USER_ROLES } from "@/constants"
import { removeEmptyKeys } from "@/utils/lib"
import { getMentorById, getMentors, getMentorsForOptions } from "@/services/mentors"

export const useGetMentors = (params = {}, options = {}) => {
    return useQuery(['all-mentors', ...Object.values(removeEmptyKeys(params))], () => getMentors(params), { cacheTime: Infinity, staleTime: Infinity, ...options })
}

export const useGetMentorsForOptions = (options = {}) => {
    const callMentors = useQuery(['call-mentors'], () => getMentorsForOptions(USER_ROLES.CALL_MENTOR), { cacheTime: Infinity, staleTime: Infinity, ...options })
    const mainMentors = useQuery(['main-mentors'], () => getMentorsForOptions(USER_ROLES.MAIN_MENTOR), { cacheTime: Infinity, staleTime: Infinity, ...options })
    return { callMentors, mainMentors }
}

export const useGetMentorById = (mentorId, params = {}, options = {}) => {
    return useQuery(['mentors', mentorId, ...Object.values(removeEmptyKeys(params))], () => getMentorById(mentorId, params), { cacheTime: Infinity, staleTime: Infinity, ...options })
}