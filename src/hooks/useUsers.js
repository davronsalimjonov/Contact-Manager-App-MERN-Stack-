import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAllUsers, getUserById, updateSelfPassword, updateUser } from "@/services/user"
import { removeEmptyKeys } from "@/utils/lib"

export const useGetUsers = (params = {}) => {
    return useQuery(['users', ...Object.values(removeEmptyKeys(params))], () => getAllUsers(params))
}

export const useGetUserById = (userId) => {
    return useQuery(['user', userId], () => getUserById(userId), { cacheTime: Infinity, staleTime: Infinity })
}

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const userId = data.get('id')
            data.delete('id')
            return await updateUser(userId, data)
        },
        onSuccess: onUpdateUserSuccess
    })

    function onUpdateUserSuccess(response) {
        const userId = response?.id
        queryClient.setQueryData(['user', userId], response)
        queryClient.setQueriesData(['users'], oldData => ({
            ...oldData,
            items: oldData?.items?.map(item => {
                if (item?.id === userId) {
                    return response
                }
                return item
            })
        }))
    }

    return updateMutation
}

export const updateSelfPasswordMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const userId = data.id
            const role = data.role
            delete data.role
            delete data.id
            return await updateSelfPassword(userId,role, data)
        },
        onSuccess: onUpdateUserPasswordSuccess
    })

    function onUpdateUserPasswordSuccess(response) {
        const userId = response?.id
        queryClient.setQueryData(['user', userId], response)
        queryClient.setQueriesData(['users'], oldData => ({
            ...oldData,
            items: oldData?.items?.map(item => {
                if (item?.id === userId) {
                    return response
                }
                return item
            })
        }))
    }

    return updateMutation
}