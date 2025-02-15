import { useQuery } from "react-query";
import { getCallCount, getRating, getStudentCountByCourse, getStudentCountByLevel, getStudentsActivity } from "@/services/statistic";
import { getEmployeeById } from "@/services/user";

const useGetCallMentorStatistic = ({
    mentorId,
    startDate,
    endDate
} = {}) => {
    const rating = useQuery(['statistic', 'rating', startDate, endDate], () => getRating(mentorId, { startDate, endDate }))
    const audioCallCount = useQuery(['statistic', 'call-count', startDate, endDate], () => getCallCount(mentorId, { startDate, endDate }))
    const studentsActivity = useQuery(['statistic', 'students-activity', startDate, endDate], () => getStudentsActivity(mentorId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course', startDate, endDate], () => getStudentCountByCourse({ teacher: mentorId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level', startDate, endDate], () => getStudentCountByLevel({ teacher: mentorId, startDate, endDate }))
    const mentor = useQuery(['mentor', mentorId], () => getEmployeeById(mentorId, 2))

    return {
        rating,
        audioCallCount,
        studentsCountByCourse,
        studentsCountByLevel,
        studentsActivity,
        mentor
    }
}

export default useGetCallMentorStatistic;