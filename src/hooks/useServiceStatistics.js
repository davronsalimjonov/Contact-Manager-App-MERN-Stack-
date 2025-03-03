import { useQuery } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { getAppRate, getLessonRate, getLessonsRateByGroup, getMentorsRateByGroup } from "@/services/service-statistics"

export const useGetAppRate = (params = {}) => {
    return useQuery(['service-statistics', 'app-rate', ...Object.values(removeEmptyKeys(params))], () => getAppRate(params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetMentorsRateByGroup = (params = {}) => {
    return useQuery(['service-statistics', 'mentors-rate-by-group', ...Object.values(removeEmptyKeys(params))], () => getMentorsRateByGroup(params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetLessonsRateByGroup = (mentorId, groupId, params = {}) => {
    return useQuery(['service-statistics', 'lessons-rate-by-group', mentorId, groupId, ...Object.values(removeEmptyKeys(params))], () => getLessonsRateByGroup(mentorId, groupId, params), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetLessonRate = (lessonId, params = {}) => {
    return useQuery(['service-statistics', 'lesson-rate', lessonId, ...Object.values(removeEmptyKeys(params))], () => getLessonRate(lessonId, params), { staleTime: Infinity, cacheTime: Infinity })
}