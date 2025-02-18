import { useMutation, useQuery, useQueryClient } from "react-query"
import { createLesson, getGroupLessons, getLessonInfo } from "@/services/lesson"

export const useGetGroupLessons = (groupId) => {
    return useQuery(['lessons', groupId], () => getGroupLessons(groupId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!groupId })
}

export const useGetLessonInfo = (lessonId) => {
    return useQuery(['lesson', lessonId], () => getLessonInfo(lessonId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!lessonId })
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