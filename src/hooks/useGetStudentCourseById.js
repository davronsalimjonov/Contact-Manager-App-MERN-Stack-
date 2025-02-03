import { getUserCourseById } from "@/services/course";
import { useQuery } from "react-query";

const useGetStudentCourseById = (courseId) => {
    return useQuery(['user-course', courseId], () => getUserCourseById(courseId), { cacheTime: Infinity, staleTime: Infinity })
}

export default useGetStudentCourseById;