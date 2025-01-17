import { useQuery } from "react-query"
import { getCourseForSelect } from "@/services/course"

export const useGetCourse = () => {
    const courseForSelect = useQuery(['course-forSelect'], () => getCourseForSelect(), {cacheTime: Infinity, staleTime: Infinity})

    return {
        courseForSelect
    }
}