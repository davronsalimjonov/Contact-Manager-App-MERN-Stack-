import { useQuery } from "react-query";
import { getMentorCallCount, getNewStudentsCount, getRating, getStudentCountByCourse, getStudentCountByLevel } from "@/services/statistic";
import { useGetUserId } from "./useGetUser";

const useGetStatistic = ({
    startDate,
    endDate
} = {}) => {
    const userId = useGetUserId()
    const callCount = useQuery(['statistic', 'call-count', startDate, endDate], () => getMentorCallCount(userId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course', startDate, endDate], () => getStudentCountByCourse({ teacher: userId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level', startDate, endDate], () => getStudentCountByLevel({ teacher: userId, startDate, endDate }))
    const newStudentsCount = useQuery(['statistic', 'new-students-count', startDate, endDate], () => getNewStudentsCount({ teacher: userId, startDate, endDate }))
    const rating = useQuery(['statistic', 'rating', startDate, endDate], () => getRating(userId, { startDate, endDate }))

    return {
        callCount,
        studentsCountByCourse,
        studentsCountByLevel,
        newStudentsCount,
        rating
    }
}

export default useGetStatistic;
