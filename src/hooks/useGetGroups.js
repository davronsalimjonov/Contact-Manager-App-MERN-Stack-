import { useQuery } from "react-query";
import { getMentorGroups, getMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";
import { getSelectGroupStudents } from "@/services/groups";

const useGetGroups = (groupData = {}, groupId) => {
    const mentorId = useGetUserId()
    const groups = useQuery(['groups', mentorId], () => getMentorGroups(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const groupStudents = useQuery(['groupStudents', mentorId, {...groupData}], () => getMentorStudents(mentorId, {...groupData}, { cacheTime: 5 * 20 * 10, staleTime: 5 * 20 * 10 }))
    const groupSelectStudents = useQuery(['groupSelectStundets', mentorId, groupId], () => getSelectGroupStudents(mentorId, groupId), { enabled: !!groupId, cacheTime: Infinity, staleTime: Infinity })
    
    return {
        groups,
        groupStudents,
        groupSelectStudents
    }
}

export default useGetGroups;
