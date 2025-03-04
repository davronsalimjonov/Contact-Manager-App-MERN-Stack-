import { useQuery } from "react-query";
import { getMentorGroups} from "@/services/course";
import { useGetUserId } from "./useGetUser";

export const useGetMyGroups = () => {
    const mentorId = useGetUserId()
    return useQuery(['groups', mentorId], () => getMentorGroups(mentorId), { cacheTime: Infinity, staleTime: Infinity })
}