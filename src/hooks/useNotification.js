import { useQuery, useQueryClient } from "react-query"
import { getNotificationCount, getNotifications } from "@/services/notification"
import { useGetUserId } from "./useGetUser"

export const useGetNotifications = ({ ...options }) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['notifications', userId], () => getNotifications(userId), { staleTime: Infinity, cacheTime: Infinity, ...options })

    const addNewNotification = (newNotification) => {
        queryClient.setQueriesData(['notification-count', userId], (oldData) => oldData + 1)
        queryClient.setQueriesData(['notifications', userId], (oldData) => [newNotification, ...oldData])
    }

    return { ...data, addNewNotification }
}

export const useGetNotificationCount = () => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['notification-count', userId], () => getNotificationCount(userId), { staleTime: Infinity, cacheTime: Infinity, enabled: !!userId })
    
    const addNewNotificationCount = (count) => {
        queryClient.setQueriesData(['notification-count', userId], (oldData) => oldData + count)
    }

    return {
        ...data,
        addNewNotificationCount
    }
}