import { useMutation, useQuery, useQueryClient } from "react-query"
import { createGroupLesson, createHomeWork, getMentorGroupLesson, getMentorLessonsSchedule, getSingleHomeTask, getSingleLesson, getStudentSubmit, rateStudentSubmit, updateHomeWork } from "@/services/schedule"
import { useGetUserId } from "./useGetUser"
import { useParams } from "react-router-dom"
import { queryClient } from "@/services/api"

export const useGetMentorLessonsSchedule = () => {
    const mentorId = useGetUserId()
    const { groupId, homeWorkId, lessonHomeTaskId, lessonStudent } = useParams()
    
    const mentorLessonSchedule = useQuery(['lessons-schedule', mentorId], () => getMentorLessonsSchedule(mentorId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorGroupLesson = useQuery(['lesson-group', groupId], () => groupId && getMentorGroupLesson(groupId), { cacheTime: Infinity, staleTime: Infinity })
    const mentorSingleLesson = useQuery(['lesson-single',  homeWorkId], () => homeWorkId && getSingleLesson(homeWorkId), { cacheTime: Infinity, staleTime: Infinity })
    const singleMentorHomeTask = useQuery(['lesson-mentor', lessonHomeTaskId], () => lessonHomeTaskId && getSingleHomeTask(lessonHomeTaskId), { cacheTime: Infinity, staleTime: Infinity})
    const studentSubmit = useQuery(['lesson-submit', lessonStudent], () => getStudentSubmit(lessonStudent), { cacheTime: Infinity, staleTime: Infinity})

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
        updateHomeWorkMutation}
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