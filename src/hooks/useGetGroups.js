import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMentorGroups, getMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";
import { createGroups, getSelectGroupStudents } from "@/services/groups";

const useGetGroups = () => {
    const mentorId = useGetUserId()
    const groups = useQuery(['groups', mentorId], () => getMentorGroups(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    
    return {
        groups
    }
}

export const useGroupMutations = () => {
    const mentorId = useGetUserId()
    const queryClient = useQueryClient()
    const createGroupMutation = useMutation({
        mutationFn: createGroups,
        onSuccess: onCreateSucces
    })

    function onCreateSucces(newGroup) {
        queryClient.setQueriesData(['groups', mentorId], (oldData) => ([...(oldData || []), newGroup]))
    }

    return {
        createGroupMutation
    }
}

export default useGetGroups;
