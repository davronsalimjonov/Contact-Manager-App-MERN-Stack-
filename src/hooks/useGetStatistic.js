import { useQuery } from "react-query";
import { getMentorCallCount, getNewStudentsCount, getStudentCountByCourse, getStudentCountByLevel } from "@/services/statistic";
import { useGetUserId } from "./useGetUser";

const useGetStatistic = ({
    startDate,
    endDate
} = {}) => {
    const userId = useGetUserId()
    const callCount = useQuery(['statistic', 'call-count'], () => getMentorCallCount(userId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course'], () => getStudentCountByCourse({ teacher: userId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level'], () => getStudentCountByLevel({ teacher: userId, startDate, endDate }))
    const newStudentsCount = useQuery(['statistic', 'new-students-count'], () => getNewStudentsCount({ teacher: userId, startDate, endDate }))

    return {
        callCount,
        studentsCountByCourse,
        studentsCountByLevel,
        newStudentsCount
    }
}

export default useGetStatistic;
