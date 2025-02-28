import { useQuery, useQueryClient } from "react-query"
import { getNotificationCount, getNotifications } from "@/services/notification"
import { useGetUserId } from "./useGetUser"

export const useGetNotifications = ({ ...options } = {}) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['notifications', userId], getNotifications, { staleTime: Infinity, cacheTime: Infinity, ...options })

    const addNewNotification = (newNotification) => {
        queryClient.setQueriesData(['notification-count', userId], (oldData) => (oldData || 0) + 1)
        queryClient.setQueriesData(['notifications', userId], (oldData) => [newNotification, ...(oldData || [])])
    }

    const updateNotificationsViewedState = (ids) => {
        queryClient.setQueriesData(['notifications', userId], (oldData) => {
            return oldData.map(notification => {
                if (ids.includes(notification?.id)) {
                    notification.isViewed = true
                }
                return notification
            })
        })
        queryClient.setQueriesData(['notification-count', userId], (oldData) => oldData - ids.length)
    }

    return { ...data, addNewNotification, updateNotificationsViewedState }
}

export const useGetNotificationCount = () => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const data = useQuery(['notification-count', userId], getNotificationCount, { staleTime: Infinity, cacheTime: Infinity, enabled: !!userId })

    const addNewNotificationCount = (count) => {
        queryClient.setQueriesData(['notification-count', userId], (oldData) => oldData + count)
    }

    return { ...data, addNewNotificationCount }
}