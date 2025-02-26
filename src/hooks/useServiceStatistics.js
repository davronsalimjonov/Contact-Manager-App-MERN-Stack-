import { useQuery } from "react-query"
import { getAppRate, getLessonRate, getLessonsRateByGroup, getMentorsRateByGroup } from "@/services/service-statistics"

export const useGetAppRate = (params = {}) => {
    return useQuery(['service-statistics', 'app-rate'], () => getAppRate(params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetMentorsRateByGroup = (params = {}) => {
    return useQuery(['service-statistics', 'mentors-rate-by-group'], () => getMentorsRateByGroup(params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetLessonsRateByGroup = (mentorId, groupId, params = {}) => {
    return useQuery(['service-statistics', 'lessons-rate-by-group', mentorId, groupId], () => getLessonsRateByGroup(mentorId, groupId, params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetLessonRate = (lessonId, params = {}) => {
    return useQuery(['service-statistics', 'lesson-rate', lessonId], () => getLessonRate(lessonId, params), { staleTime: Infinity, cacheTime: Infinity })
}