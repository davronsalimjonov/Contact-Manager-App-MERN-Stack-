import { useQuery } from "react-query";
import { getCourseRate } from "@/services/course";

const useGetCourseRate = (courseId, params) => {
    return useQuery(['course-rate', courseId, params], () => getCourseRate(courseId, params), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetCourseRate;