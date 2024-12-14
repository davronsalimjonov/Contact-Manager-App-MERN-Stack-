import { useQuery } from "react-query";
import { getAcademicMentorSalary, getAllStudentsCount, getLessonRate, getStudentCountByCourse, getStudentCountByLevel, getStudentsActivity } from "@/services/statistic";
import { getEmployeeById } from "@/services/user";

const useGetMainMentorStatistic = ({
    mentorId,
    startDate,
    endDate
} = {}) => {
    const studentsCount = useQuery(['statistic', 'call-count', startDate, endDate], () => getAllStudentsCount(mentorId, { startDate, endDate }))
    const studentsCountByCourse = useQuery(['statistic', 'student-count-by-course', startDate, endDate], () => getStudentCountByCourse({ teacher: mentorId, startDate, endDate }))
    const studentsCountByLevel = useQuery(['statistic', 'student-count-by-level', startDate, endDate], () => getStudentCountByLevel({ teacher: mentorId, startDate, endDate }))
    const studentsActivity = useQuery(['statistic', 'students-activity', startDate, endDate], () => getStudentsActivity(mentorId, { startDate, endDate }))
    const mentorSalary = useQuery(['statistic', 'mentor-salary', startDate, endDate], () => getAcademicMentorSalary(mentorId,{ startDate, endDate }))
    const lessonRate = useQuery(['statistic', 'lesson-rate', startDate, endDate, mentorId], () => getLessonRate(mentorId, { startDate, endDate }))
    const mentor = useQuery(['mentor', mentorId], () => getEmployeeById(mentorId, 2))

    return {
        studentsCount,
        studentsCountByCourse,
        studentsCountByLevel,
        studentsActivity,
        lessonRate,
        mentorSalary,
        mentor
    }
}

export default useGetMainMentorStatistic;