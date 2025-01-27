import { useQuery } from "react-query";
import { getAllStudentsCount, getMentorCallCount, getMentorSalary, getNewStudentsCount, getOnlineUsers, getPaidStudentCount, getRating, getStatusUser, getStudentActivity, getStudentCountByCourse, getStudentCountByLevel, getTodayProUsers } from "@/services/statistic";
import { useGetUserId } from "./useGetUser";

const useGetStatistic = ({
    startDate,
    endDate
} = {}) => {
    const userId = useGetUserId()
    
    const callCount = useQuery(['statistic', 'call-count'], () => getMentorCallCount(userId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course'], () => getStudentCountByCourse({ teacher: userId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level'], () => getStudentCountByLevel({ teacher: userId, startDate, endDate }))
    const newStudentsCount = useQuery(['statistic', 'new-students-count', startDate, endDate, userId], () => getNewStudentsCount({ teacher: userId, startDate, endDate }))
    const rating = useQuery(['statistic', 'rating'], () => getRating(userId, { startDate, endDate }))

    const allStudentsCount = useQuery(['statistic', 'all-student-count'], () => getAllStudentsCount(userId, { startDate, endDate }))
    const paidStudentsCount = useQuery(['statistic', 'paid-student-count', startDate, endDate], () => getPaidStudentCount({ startDate, endDate }))
    const todayProUsers = useQuery(['statisctic', 'today-pro-users'], () => getTodayProUsers())
    const todayOnlineUsers = useQuery(['statistic', 'online-users'], () => getOnlineUsers())
    const statusUser = useQuery(['statistic', 'users-status'], () => getStatusUser({ teacher: userId ,startDate, endDate }))
    const studentActivity = useQuery(['statistic', 'user-activity'], () => getStudentActivity(userId, {startDate, endDate}))
    const mentorSalary = useQuery(['statistic', 'mentor-salary'], () => getMentorSalary(userId, {startDate, endDate}))

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
        statusUser,
        studentActivity,
        mentorSalary
    }
}

export default useGetStatistic;
