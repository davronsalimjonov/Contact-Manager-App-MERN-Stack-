import CoursesTable from "@/components/templates/CoursesTable";
import useGetStudentCourses from "@/hooks/useGetStudentCourses";
import { useParams } from "react-router-dom";




const defaultValues = {
    word: '',
    description: '',
    lvl: '',
    unit: ''
}

const Courses = () => {
    const {studentId} = useParams();
 
    const { data: courses, isLoading: isLoadingCourses } = useGetStudentCourses(studentId);

    return (
        <>
            
            <CoursesTable
                courses={courses}
                isLoading={isLoadingCourses}
            />
        </>
    )
}

export default Courses;