import { useQuery } from "react-query";
import { getActiveStudentsCount, getAllStudentsCount, getCallMentorStatistic, getMainMentorStatistic, getMentorCallCount, getMentorSalary, getNewStudentsCount, getOnlineUsers, getPaidStudentCount, getRating, getStatusUser, getStudentActivity, getStudentCountByCourse, getStudentCountByLevel, getStudentsCountByStatus, getTodayProUsers } from "@/services/statistic";
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
    const statusUser = useQuery(['statistic', 'users-status'], () => getStatusUser({ teacher: userId, startDate, endDate }))
    const studentActivity = useQuery(['statistic', 'user-activity'], () => getStudentActivity(userId, { startDate, endDate }))
    const mentorSalary = useQuery(['statistic', 'mentor-salary'], () => getMentorSalary(userId, { startDate, endDate }))

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

export const useGetStudentsCountByCourse = ({ startDate, endDate, mentorId } = {}) => {
    return useQuery(['statistic', 'students-count-by-course', mentorId, startDate, endDate], () => getStudentCountByCourse({ teacher: mentorId, startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetStudentsCountByLevel = ({ startDate, endDate, mentorId } = {}) => {
    return useQuery(['statistic', 'students-count-by-level', mentorId, startDate, endDate], () => getStudentCountByLevel({ teacher: mentorId, startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetCallMentorStatistic = ({ mentorId, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'call-mentor', mentorId, startDate, endDate], () => getCallMentorStatistic(mentorId, { startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetNewStudentsCount = ({ mentorId, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'new-students-count', mentorId, startDate, endDate], () => getNewStudentsCount({ teacher: mentorId, startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetMainMentorStatistic = ({ mentorId, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'main-mentor', mentorId, startDate, endDate], () => getMainMentorStatistic(mentorId, { startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetStudentsCountByStatus = ({ mentorId, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'students-count-by-status', mentorId, startDate, endDate], () => getStudentsCountByStatus({ teacher: mentorId, startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetActiveStudentsCount = ({ mentorId, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'active-students', mentorId, startDate, endDate], () => getActiveStudentsCount({ teacher: mentorId, startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export default useGetStatistic;
