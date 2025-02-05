import { useQuery } from "react-query"
import { useGetUserId } from "./useGetUser"
import { getMentorStudents, } from "@/services/course"
import { getSelectGroupStudents } from "@/services/groups"

export const useGetGroupStudents = (groupData = {}, groupId) => {
    const mentorId = useGetUserId()
    const groupStudents = useQuery(['groupStudents', mentorId, {...groupData}], () => getMentorStudents(mentorId, {...groupData}))
    const groupSelectStudents = useQuery(['groupSelectStundets', mentorId, groupId], () => getSelectGroupStudents(mentorId, groupId), { enabled: !!groupId, cacheTime: Infinity, staleTime: Infinity })

    return {
        groupStudents,
        groupSelectStudents
    }
}