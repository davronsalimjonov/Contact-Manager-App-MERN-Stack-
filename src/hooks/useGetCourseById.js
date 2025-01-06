import { useQuery } from "react-query";
import { getCourseById } from "@/services/course";

const useGetCourseById = (courseId) => {
    return useQuery(['course',courseId], () => getCourseById(courseId),{ cacheTime: Infinity, staleTime: Infinity })
}

export default useGetCourseById;