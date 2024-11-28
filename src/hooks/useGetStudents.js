import { useQuery } from "react-query";
import { removeEmptyKeys } from "@/utils/lib";
import { getCallMentorStudents } from "@/services/course";
import { useGetUserId } from "./useGetUser";

const useGetStudents = (params = {}) => {
    const userId = useGetUserId()
    
    return useQuery(
        ['students', userId, ...Object.values(removeEmptyKeys(params))],
        ({ pageParam = 1 }) => getCallMentorStudents(userId, { ...params, page: pageParam, limit: 15 }),
        { cacheTime: 5 * 60 * 1000, staleTime: 5 * 60 * 1000 }
    )
}

export default useGetStudents;
