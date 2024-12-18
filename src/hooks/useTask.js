import { useQuery } from "react-query"
import { getUncompletedTasks } from "@/services/task"

export const useGetUncompletedTasks = (chatId) => {
    return useQuery(['tasks', 'uncompleted', chatId], () => getUncompletedTasks(chatId), { staleTime: Infinity, cacheTime: Infinity })
}