import { getStudentCourses } from "@/services/course";
import { useQuery } from "react-query";

const useGetStudentCourses = (studentId) => {
    return useQuery(['student-courses', studentId], () => getStudentCourses(studentId), { staleTime: Infinity, cacheTime: Infinity })
}

export default useGetStudentCourses;