import { useQuery } from "react-query";
import { getAllCourses } from "@/services/course";
import { getMentors } from "@/services/mentors";

const useGetStudentCourse = () => {
    const courses = useQuery(['courses'], () => getAllCourses())
    const teachers = useQuery(['teachers',2], () => getMentors(2))
    const secondTeachers = useQuery(['teachers',4], () => getMentors(4))

    return {
        courses,
        teachers,
        secondTeachers
    }
}

export default useGetStudentCourse;
