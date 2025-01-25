import { useQuery } from "react-query";
import { getAllStudentsCount, getMentorCallCount, getMentorSalary, getNewStudentsCount, getOnlineUsers, getPaidStudentCount, getRating, getStatusUser, getStudentActivity, getStudentCountByCourse, getStudentCountByLevel, getTodayProUsers } from "@/services/statistic";
import { useGetUserId } from "./useGetUser";

const useGetStatistic = ({
    startDate,
    endDate
} = {}) => {
    const userId = useGetUserId()
    
    const callCount = useQuery(['statistic', 'call-count', startDate, endDate, userId], () => getMentorCallCount(userId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course', startDate, endDate, userId], () => getStudentCountByCourse({ teacher: userId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level', startDate, endDate, userId], () => getStudentCountByLevel({ teacher: userId, startDate, endDate }))
    const newStudentsCount = useQuery(['statistic', 'new-students-count', startDate, endDate, userId], () => getNewStudentsCount({ teacher: userId, startDate, endDate }))
    const rating = useQuery(['statistic', 'rating', startDate, endDate], () => getRating(userId, { startDate, endDate }))

    const allStudentsCount = useQuery(['statistic', 'all-student-count'], () => getAllStudentsCount(userId))
    const paidStudentsCount = useQuery(['statistic', 'paid-student-count', startDate, endDate], () => getPaidStudentCount({ startDate, endDate }))
    const todayProUsers = useQuery(['statisctic', 'today-pro-users'], () => getTodayProUsers())
    const todayOnlineUsers = useQuery(['statistic', 'online-users'], () => getOnlineUsers())
    const statusUser = useQuery(['statistic', 'users-status', startDate, endDate, userId], () => getStatusUser({ teacher: userId ,startDate, endDate }))
    const studentActivity = useQuery(['statistic', 'user-activity', startDate, endDate, userId], () => getStudentActivity(userId, {startDate, endDate}))
    const mentorSalary = useQuery(['statistic', 'mentor-salary', startDate, endDate, userId], () => getMentorSalary(userId, {startDate, endDate}))

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
