import { useMutation, useQuery, useQueryClient } from "react-query"
import { createLesson, getGroupLessons } from "@/services/lesson"

export const useGetGroupLessons = (groupId) => {
    return useQuery(['lessons', groupId], () => getGroupLessons(groupId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!groupId })
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