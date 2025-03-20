import { useMutation, useQuery, useQueryClient } from "react-query"
import { getCourses, getUserCourseById, getUserCourses, updateUserCourse } from "@/services/course"
import { useGetUserId } from "./useGetUser"

export const useGetUserCourses = (userId) => {
    return useQuery(['user-courses', userId], () => getUserCourses(userId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!userId })
}

export const useGetUserCourseById = (userCourseId) => {
    return useQuery(['user-course', 'single', userCourseId], () => getUserCourseById(userCourseId), { cacheTime: Infinity, staleTime: Infinity, enabled: !!userCourseId })
}

export const useGetCourses = () => {
    return useQuery(['courses'], () => getCourses(), { cacheTime: Infinity, staleTime: Infinity });
}

export const useUserCourseMutations = (userCourseId) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: data => updateUserCourse(userCourseId, data),
        onSuccess: updateUserCourseState
    })
    const updateStatusMutation = useMutation({
        mutationFn: data => updateUserCourse(userCourseId, { status: data }),
        onSuccess: data => updateStatusState(data)
    })

    function updateUserCourseState(data) {
        queryClient.setQueriesData(['user-course', 'single', userCourseId], () => data)
        queryClient.setQueryData(['chat', 'info', userCourseId], (oldData) => ({
            ...oldData,
            userCourse: { ...oldData?.userCourse, ...data }
        }))
    }

    function updateStatusState(data) {
        updateUserCourseState(data)
        queryClient.setQueriesData(['students', userId], (students) => {
            return students?.map(student => {
                if (student?.id === userCourseId) {
                    student = { ...student, status: data?.status }
                }
                return student
            })
        })
    }

    return {
        updateMutation,
        updateStatusMutation
    }
}

export const useUpdateCallMentorMutation = (userCourseId) => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: data => updateUserCourse(userCourseId, data),
        onSuccess: updateUserCourseState
    })

    function updateUserCourseState(newData) {
        queryClient.setQueriesData(['students-all'], oldData => ({
            ...oldData,
            items: oldData?.items?.map(student => {
                if (student?.id === userCourseId) student.secondTeacher = newData?.secondTeacher
                return student
            })
        }))
    }

    return updateMutation
}