import ScheduleTable from "@/components/templates/ScheduleTable"
import cls from "./ScheduleHomeWork.module.scss"
import Pagination from "@/components/UI/moleculs/Pagination"
import ScheduleHeader from "@/components/UI/organisms/ScheduleHeader"
import { useGetLessonStudents } from "@/hooks/useGetLessonStudents"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "@/components/UI/atoms/Loader"

const ScheduleHomeWork = () => {
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1
    })
    const { homeWorkId } = useParams()

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const handleLimitChange = (limit) => {
        setPagination((prev) => ({ ...prev, limit }));
    };
    const { lessonStudents: { data: lessonStudents, isLoading: isLessonStudentsLoading } } = useGetLessonStudents({ ...pagination })

    return (
        isLessonStudentsLoading ? <Loader /> : <div className={cls.ScheduleHomeWork}>
            <div className={cls.ScheduleHomeWork__ScheduleHeader}>
                <ScheduleHeader />
            </div>
            <div className={cls.ScheduleHomeWork__table}>
                <ScheduleTable
                    students={lessonStudents?.items}
                    isLoading={isLessonStudentsLoading}
                    homeWorkId={homeWorkId}
                />
            </div>
            <div className={cls.ScheduleHomeWork__pagination}>
                <div>
                    <Pagination
                        metaData={lessonStudents?.meta}
                        limit={pagination.limit}
                        setLimit={handleLimitChange}
                        page={pagination.page}
                        setPage={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ScheduleHomeWork