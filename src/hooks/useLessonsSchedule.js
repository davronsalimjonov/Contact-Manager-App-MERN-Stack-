import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSchedule, createScheduleMove, deleteMovedSchedule, getGroupLessonsSchedule, getMentorLessonsSchedule, createGroupLesson, createHomeWork, getMentorGroupLesson, getSingleLesson } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    return useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupLessons = (groupId) => {
    return useQuery(['group-lessons', groupId], () => getMentorGroupLesson(groupId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!groupId })
}

export const useGetLessonInfo = (lessonId) => {
    return useQuery(['lesson', lessonId], () => getSingleLesson(lessonId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!lessonId })
}

export const useGetGroupLessonsSchedule = (groupId) => {
    return useQuery(['lessons-schedule', 'group', groupId], () => getGroupLessonsSchedule(groupId), { cacheTime: Infinity, staleTime: Infinity })
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

export const useLessonMutations = (groupId) => {
    const queryClient = useQueryClient()
    const createLessonMutation = useMutation({
        mutationFn: createGroupLesson,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newLesson) {
        queryClient.setQueriesData(['group-lessons', groupId], (oldData) => ([...(oldData || []), newLesson]))
    }

    return {
        createLessonMutation
    }
}

export const useCreateLessonScheduleMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({ mutationFn: createSchedule, onSuccess: onCreateScheduleSuccess })

    function onCreateScheduleSuccess(newSchedule) {
        const groupId = newSchedule?.group?.id
        queryClient.setQueryData(['lessons-schedule', 'group', groupId], (oldData) => ([newSchedule, ...oldData]))
    }

    return createMutation
}

export const useScheduleMoveMutation = () => {
    const queryClient = useQueryClient()
    const moveMutation = useMutation({
        mutationFn: createScheduleMove,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(data) {
        queryClient.setQueryData(['lessons-schedule', 'group', data?.group?.id], oldData => oldData?.map(lesson => lesson?.id === data?.id ? data : lesson))
    }

    return moveMutation
}

export const useScheduleMoveDeleteMutation = () => {
    const queryClient = useQueryClient()
    const moveDeleteMutation = useMutation({
        mutationFn: deleteMovedSchedule,
        onSuccess: onDeleteSuccess
    })

    function onDeleteSuccess(data) {
        queryClient.setQueryData(['lessons-schedule', 'group', data?.group?.id], oldData => oldData?.map(lesson => lesson?.id === data?.id ? data : lesson))
    }

    return moveDeleteMutation
}