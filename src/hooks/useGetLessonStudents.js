import { getLessonStudents } from "@/services/schedule"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export const useGetLessonStudents = ({
    data
} = {}) => {
    const { homeWorkId } = useParams()

    const lessonStudents = useQuery(['lesson-students', data?.limit, data?.page, homeWorkId], () => getLessonStudents(homeWorkId, {...data}))

    return {
        lessonStudents
    }
}