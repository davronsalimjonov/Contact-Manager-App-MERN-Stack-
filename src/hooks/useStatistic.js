import { useQuery } from "react-query";
import { getAcademyManagerStatistics, getActiveStudentsCount, getCallMentorStatistic, getMainMentorStatistic, getMentorSalary, getNewStudentsCount, getSoldCoursesCountStatistic, getStudentCountByCourse, getStudentCountByLevel, getStudentsCountByStatus } from "@/services/statistic";

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

export const useGetAcademyManagerStatistics = ({ startDate, endDate } = {}) => {
    return useQuery(['statistic', 'academy-manager', startDate, endDate], () => getAcademyManagerStatistics({ startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetSoldCoursesCountStatistic = ({ startDate, endDate } = {}) => {
    return useQuery(['statistic', 'sold-courses', startDate, endDate], () => getSoldCoursesCountStatistic({ startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetMentorSalary = ({ mentorId, role, startDate, endDate } = {}) => {
    return useQuery(['statistic', 'mentor-salary', mentorId, role, startDate, endDate], () => getMentorSalary(mentorId, role, { startDate, endDate }), { staleTime: Infinity, cacheTime: Infinity })
}