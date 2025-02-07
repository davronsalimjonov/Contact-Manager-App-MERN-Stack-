import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSchedule, createScheduleMove, deleteMovedSchedule, getGroupLessonsSchedule, getMentorLessonsSchedule } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    return useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupLessonsSchedule = (groupId) => {
    return useQuery(['lessons-schedule', 'group', groupId], () => getGroupLessonsSchedule(groupId), { cacheTime: Infinity, staleTime: Infinity })
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