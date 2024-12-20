import { useQuery } from "react-query";
import { getMentorGroups, getMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";

const useGetGroups = (groupData = {}) => {
    const mentorId = useGetUserId()
    const groups = useQuery(['groups', mentorId], () => getMentorGroups(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const groupStudents = useQuery(['groupStudents', mentorId, {...groupData}], () => getMentorStudents(mentorId, {...groupData}, { cacheTime: Infinity, staleTime: Infinity }))
    
    return {
        groups,
        groupStudents
    }
}

export default useGetGroups;
