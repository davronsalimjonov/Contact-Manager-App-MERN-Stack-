import { useQuery } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { getLessonStudents } from "@/services/schedule"

export const useGetLessonStudents = (lessonId, params = {}) => {
    return useQuery(['lesson-students', lessonId, ...Object.values(removeEmptyKeys(params))], () => getLessonStudents(lessonId, {...params}))
}