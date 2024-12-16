import { useQuery } from "react-query";
import { getCourseAcceptedRate } from "@/services/course";

const useGetAcceptedRate = (courseId,params) => {
    return useQuery(['course-rate', courseId,params], () => getCourseAcceptedRate(courseId,params), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetAcceptedRate;