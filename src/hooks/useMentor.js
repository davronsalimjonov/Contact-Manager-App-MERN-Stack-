import { useMutation, useQuery, useQueryClient } from "react-query"
import { USER_ROLES } from "@/constants"
import { removeEmptyKeys } from "@/utils/lib"
import { getMentorById, getMentors, getMentorsForOptions, updateMentor } from "@/services/mentors"

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

export const useUpdateMentorMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (fd) => {
            const mentorId = fd.get('id')
            fd.delete('id')
            return await updateMentor(mentorId, fd)
        },
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(data) {
        const mentorId = data?.id
        queryClient.setQueriesData(['mentors', mentorId], (oldData) => ({ ...oldData, ...data }))
        queryClient.setQueriesData(['all-mentors'], (oldData) => ({
            ...oldData,
            items: oldData?.items?.map(item => item.id === mentorId ? data : item)
        }))
    }

    return updateMutation
}