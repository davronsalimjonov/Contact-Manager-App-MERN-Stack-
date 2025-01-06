import { useQuery } from "react-query";
import { getAllStudentsCount, getMentorCallCount, getNewStudentsCount, getOnlineUsers, getPaidStudentCount, getRating, getStatusUser, getStudentCountByCourse, getStudentCountByLevel, getTodayProUsers } from "@/services/statistic";
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

    const allStudentsCount = useQuery(['statistic', 'all-student-count'], () => getAllStudentsCount())
    const paidStudentsCount = useQuery(['statistic', 'paid-student-count'], () => getPaidStudentCount({ startDate, endDate }))
    const todayProUsers = useQuery(['statisctic', 'today-pro-users'], () => getTodayProUsers())
    const todayOnlineUsers = useQuery(['statistic', 'online-users'], () => getOnlineUsers())
    const statusUser = useQuery(['statistic', 'users-status'], () => getStatusUser({ startDate, endDate }))

    return {
        callCount,
        studentsCountByCourse,
        studentsCountByLevel,
        newStudentsCount,
        rating,
        allStudentsCount,
        paidStudentsCount,
        todayProUsers,
        todayOnlineUsers,
        statusUser
    }
}

export default useGetStatistic;
