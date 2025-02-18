import { useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "@/components/UI/atoms/Loader"
import { useGetLessonInfo } from "@/hooks/useLessons"
import Pagination from "@/components/UI/moleculs/CustomPagination"
import { useGetLessonStudents } from "@/hooks/useGetLessonStudents"
import LessonInfoCard from "@/components/UI/organisms/LessonInfoCard"
import StudentLessonAttendanceTable from "@/components/templates/LessonStudentsAttendanceTable"
import cls from "./SingleLesson.module.scss"

const SingleLesson = () => {
    const { lessonId } = useParams()
    const [pagination, setPagination] = useState({ limit: 12, page: 0 })
    const { isLoading: isLoadingLessonInfo } = useGetLessonInfo(lessonId)
    const { data: lessonStudents, isLoading: isLessonStudentsLoading } = useGetLessonStudents(lessonId, { page: pagination.page + 1, limit: pagination.limit })

    return isLoadingLessonInfo ? <Loader /> : (
        <div className={cls.lesson}>
            <LessonInfoCard lessonId={lessonId} />
            {!isLessonStudentsLoading ? (
                <StudentLessonAttendanceTable
                    students={lessonStudents?.items}
                    startIndex={pagination?.page * pagination?.limit}
                />
            ) : (
                <Loader />
            )}
            <Pagination
                pageCount={lessonStudents?.meta?.totalPages}
                onPageChange={({ selected: page }) => setPagination(state => ({ ...state, page }))}
            />
        </div>
    )
}

export default SingleLesson