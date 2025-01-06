import { getNotification } from "@/services/notification"
import { useQuery } from "react-query"

export function useGetNotification(type,params) {
    const query = useQuery(['notification', type,params], () => getNotification(type,params), { staleTime: Infinity, cacheTime: Infinity })

    return query
}