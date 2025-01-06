import { getAllCourses } from "@/services/course";
import { useQuery } from "react-query";

const useGetAllCourses = () => {
    return useQuery(['courses'], () => getAllCourses(),{ cacheTime: Infinity, staleTime: Infinity });
}

export default useGetAllCourses;