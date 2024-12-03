import { useQuery } from "react-query";
import { getCourses, getMentorGroups } from "@/services/course";

const useGetCourses = () => {
    return useQuery(['courses'], () => getCourses(),{ cacheTime: Infinity, staleTime: Infinity });
}

export default useGetCourses;
