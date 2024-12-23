import { useQuery } from "react-query";
import { getMentorGroups } from "@/services/course";
import { useGetUserId } from "./useGetUser";

const useGetGroups = () => {
    const mentorId = useGetUserId()
    
    return useQuery(['groups', mentorId], () => getMentorGroups(mentorId), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetGroups;
