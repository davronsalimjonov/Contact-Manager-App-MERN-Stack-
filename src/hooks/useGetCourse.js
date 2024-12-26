import { getCourseForSelect } from "@/services/course"
import { useQuery } from "react-query"

export const useGetCourse = () => {
    const courseForSelect = useQuery(['course-forSelect'], () => getCourseForSelect())

    return {
        courseForSelect
    }
}