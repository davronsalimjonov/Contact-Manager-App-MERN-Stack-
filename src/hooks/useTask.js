import { useMutation, useQuery, useQueryClient } from "react-query"
import { createTask, getUncompletedTasks, updateTask } from "@/services/task"
import { generateUUID } from "@/utils/lib"

export const useGetUncompletedTasks = (chatId) => {
    return useQuery(['tasks', 'uncompleted', chatId], () => getUncompletedTasks(chatId), { staleTime: Infinity, cacheTime: Infinity })
}

export const useTaskMutations = (chatId) => {
    const queryClient = useQueryClient()
    const createTaskMutation = useMutation({
        mutationKey: ['tasks', 'create'],
        mutationFn: createTask,
        onMutate: addNewTask,
        onSuccess: (response, _, context) => updateTaskState(context.tempId, response),
    })

    const updateTaskMutation = useMutation({
        mutationFn: (data) => {
            const id = data.id
            delete data.id
            updateTask(id, data)
        },
        onMutate: (data) => updateTaskState(data.id, data),
    })

    function addNewTask(newTask) {
        const tempId = generateUUID()
        queryClient.setQueryData(['tasks', 'uncompleted', chatId], (oldData) => {
            if (oldData?.length > 0) return [{ ...newTask, id: tempId }, ...oldData]
            else return [newTask]
        })
        return { tempId }
    }

    function updateTaskState(id, data) {
        queryClient.setQueryData(['tasks', 'uncompleted', chatId], (oldData) => {
            if (!oldData) return [data];
            return oldData.map(task => task?.id === id ? data : task);
        });
    }

    return {
        createTaskMutation,
        updateTaskMutation,
    }
}