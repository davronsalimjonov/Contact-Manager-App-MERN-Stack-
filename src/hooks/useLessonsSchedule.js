import { useMutation, useQuery, useQueryClient } from "react-query"
import { createGroupLesson, createHomeWork, getMentorGroupLesson, getMentorLessonsSchedule, getSingleLesson } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"
import { useParams } from "react-router-dom"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    const { groupId, homeWorkId } = useParams()
    
    const mentorLessonSchedule = useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorGroupLesson = useQuery(['lesson-group', groupId], () => groupId && getMentorGroupLesson(groupId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorSingleLesson = useQuery(['lesson-single',  homeWorkId], () => homeWorkId && getSingleLesson(homeWorkId), { cacheTime: Infinity, staleTime: Infinity })

    return {
        mentorLessonSchedule,
        mentorGroupLesson,
        mentorSingleLesson
    }
}

export const useHomeWorkMutations = () => {
    const queryClient = useQueryClient()
    const createHomeWorkMutation = useMutation({
        mutationFn: createHomeWork,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newLesson) {
        queryClient.setQueriesData(['lessons-single'], (oldLesson) => ([...(oldLesson || []), newLesson]))
    }

    return {
        createHomeWorkMutation
    }
}

export const useLessonMutations = () => {
    const { groupId } = useParams()
    const queryClient = useQueryClient()
    const createLessonMutation = useMutation({
        mutationFn: createGroupLesson,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newLesson) {
        queryClient.setQueriesData(['lessons-schedule', groupId], (oldData) => ([...(oldData || []), newLesson]))
    }

    return {
        createLessonMutation
    }
}