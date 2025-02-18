import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { createSchedule, createScheduleMove, deleteMovedSchedule, getGroupLessonsSchedule, getMentorLessonsSchedule, createHomeWork, getSingleHomeTask, getStudentSubmit, rateStudentSubmit, updateHomeWork, updateLessonSchedule } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    return useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useGetGroupLessonsSchedule = (groupId) => {
    return useQuery(['lessons-schedule', 'group', groupId], () => getGroupLessonsSchedule(groupId), { cacheTime: Infinity, staleTime: Infinity })
    // const { groupId, homeWorkId, lessonHomeTaskId, lessonStudent } = useParams()

    const mentorLessonSchedule = useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorGroupLesson = useQuery(['lesson-group', groupId], () => groupId && getMentorGroupLesson(groupId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorSingleLesson = useQuery(['lesson-single', homeWorkId], () => homeWorkId && getSingleLesson(homeWorkId), { cacheTime: Infinity, staleTime: Infinity })
    const singleMentorHomeTask = useQuery(['lesson-mentor', lessonHomeTaskId], () => lessonHomeTaskId && getSingleHomeTask(lessonHomeTaskId), { cacheTime: Infinity, staleTime: Infinity })
    const studentSubmit = useQuery(['lesson-submit', lessonStudent], () => getStudentSubmit(lessonStudent), { cacheTime: Infinity, staleTime: Infinity })

    return {
        mentorLessonSchedule,
        mentorGroupLesson,
        mentorSingleLesson,
        singleMentorHomeTask,
        studentSubmit
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

export const useRateStudentHomeWorkMutations = () => {
    const { lessonId } = useParams()
    const queryClient = useQueryClient()
    const rateHomeWorkMutation = useMutation({
        mutationFn: rateStudentSubmit,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newRate) {
        queryClient.setQueriesData(['lessons-rate', lessonId], (oldRate) => ([...(oldRate || []), newRate]))
    }

    return {
        rateHomeWorkMutation
    }
}

export const useUpdateHomeWorkMutations = () => {
    const queryClient = useQueryClient()
    const updateHomeWorkMutation = useMutation({
        mutationFn: updateHomeWork,
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(updateLesson) {
        queryClient.setQueriesData(['lessons-single'], (oldLesson) => ([...(oldLesson || []), updateLesson]))
    }

    return {
        updateHomeWorkMutation
    }
}

export const useCreateLessonScheduleMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({ mutationFn: createSchedule, onSuccess: onCreateScheduleSuccess })

    function onCreateScheduleSuccess(newSchedule) {
        const groupId = newSchedule?.group?.id
        queryClient.setQueryData(['lessons-schedule', 'group', groupId], (oldData) => ({
            ...oldData,
            items: [newSchedule, ...(oldData?.items || [])]
        }))
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
        queryClient.setQueryData(['lessons-schedule', 'group', data?.group?.id], oldData => ({
            ...oldData,
            items: oldData?.items?.map(lesson => lesson?.id === data?.id ? data : lesson)
        }))
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
        queryClient.setQueryData(['lessons-schedule', 'group', data?.group?.id], oldData => ({
            ...oldData,
            items: oldData?.items?.map(lesson => lesson?.id === data?.id ? data : lesson)
        }))
    }

    return moveDeleteMutation
}

export const useScheduleUpdateMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const id = data?.id
            delete data?.id
            return await updateLessonSchedule(id, data)
        },
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(data) {
        queryClient.setQueryData(['lessons-schedule', 'group', data?.group?.id], oldData => ({
            ...oldData,
            items: oldData?.items?.map(lesson => lesson?.id === data?.id ? data : lesson)
        }))
    }

    return updateMutation
}