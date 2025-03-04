import { useMutation, useQuery, useQueryClient } from "react-query"
import { createLesson, createLessonHomeWork, getGroupLessons, getLessonHomeTask, getLessonInfo, getStudentLessonHomework, rateLessonHomeWork, updateLessonHomeTask } from "@/services/lesson"

export const useGetGroupLessons = (groupId) => {
    return useQuery(['lessons', groupId], () => getGroupLessons(groupId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!groupId })
}

export const useGetLessonInfo = (lessonId) => {
    return useQuery(['lesson-info', lessonId], () => getLessonInfo(lessonId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!lessonId })
}

export const useGetStudentLessonHomework = (homeWorkId) => {
    return useQuery(['lesson-home-work', homeWorkId], () => getStudentLessonHomework(homeWorkId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!homeWorkId })
}

export const useGetLessonHomeTask = (homeTaskId) => {
    return useQuery(['lesson-home-task', homeTaskId], () => getLessonHomeTask(homeTaskId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!homeTaskId })
}

export const useCreateLessonMutation = () => {
    const queryClient = useQueryClient()
    const createLessonMutation = useMutation({
        mutationFn: createLesson,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(newLesson, body) {
        const groupId = body?.group
        queryClient.setQueryData(['lessons', groupId], (oldData) => ([...(oldData || []), newLesson]))
    }

    return createLessonMutation
}

export const useCreateLessonHomeWorkMutation = () => {
    const queryClient = useQueryClient()
    const createHomeWorkMutation = useMutation({
        mutationFn: createLessonHomeWork,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(homeWork, body) {
        const lessonId = body?.get('lesson')
        queryClient.setQueryData(['lesson-info', lessonId], (oldData) => ({
            ...oldData,
            lessonHomeTask: homeWork
        }))
    }

    return createHomeWorkMutation
}

export const useRateLessonHomeWorkMutation = () => {
    const queryClient = useQueryClient()
    const rateLessonHomeWorkMutation = useMutation({
        mutationFn: async data => {
            data = Object.assign({}, data)
            const id = data.id
            delete data.id
            delete data.homeWorkId
            return await rateLessonHomeWork(id, data)
        },
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess(res, body) {
        const homeWorkId = body.homeWorkId
        queryClient.setQueryData(['lesson-home-work', homeWorkId], (oldData) => ({
            ...oldData,
            mark: body.mark,
            comment: body.comment
        }))
    }

    return rateLessonHomeWorkMutation
}

export const useUpdateLessonHomeTaskMutation = () => {
   const queryClient = useQueryClient()
   const updateLessonHomeWorkMutation = useMutation({
       mutationFn: async data => {
           const id = data.get('id')
           data.delete('id')
           return await updateLessonHomeTask(id, data)
       },
       onSuccess: onCreateSuccess
   })

   function onCreateSuccess(updatedTask) {
       const homeTaskId = updatedTask?.id
       queryClient.setQueryData(['lesson-home-task', homeTaskId], updatedTask)
   }
   
   return updateLessonHomeWorkMutation
}