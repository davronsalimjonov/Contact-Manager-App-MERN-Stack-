import { useMutation, useQuery, useQueryClient } from "react-query"
import { useGetUserId } from "./useGetUser"
import { getMentorStudents, updateUserCourse } from "@/services/course"
import { addStudentsToGroup, getSelectGroupStudents } from "@/services/groups"

export const useGetGroupStudents = (groupData = {}, groupId) => {
    const mentorId = useGetUserId()
    const groupStudents = useQuery(['groupStudents', mentorId, {...groupData}], () => getMentorStudents(mentorId, {...groupData}))
    const groupSelectStudents = useQuery(['groupSelectStundets', mentorId, groupId], () => getSelectGroupStudents(mentorId, groupId), { enabled: !!groupId, cacheTime: Infinity, staleTime: Infinity })

    return {
        groupStudents,
        groupSelectStudents
    }
}

export const useTransferMutations = () => {
    const queryClient = useQueryClient()
    
    const createTransferMutation = useMutation({
        mutationFn: data => {
            const id = data.id
            delete data.id
            updateUserCourse(id, data)
        },
        onSuccess: (data) => {
            queryClient.setQueriesData(['transfer-students', data], () => (data))
            queryClient.invalidateQueries({ queryKey: ['groupStudents'], exact: false })
        }
    })  


    return {
        createTransferMutation
    }
}

