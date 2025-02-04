import { useMutation, useQuery, useQueryClient } from "react-query"
import { createGroupLesson, getMentorGroupLesson, getMentorLessonsSchedule } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"
import { useParams } from "react-router-dom"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    const { groupId } = useParams()

    const mentorLessonSchedule = useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorGroupLesson = useQuery(['lesson-group', groupId], () => getMentorGroupLesson(groupId), { cacheTime: Infinity, staleTime: Infinity })
    
    return {
        mentorLessonSchedule,
        mentorGroupLesson
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