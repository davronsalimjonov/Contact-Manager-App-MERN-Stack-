import { useMutation, useQuery, useQueryClient } from "react-query"
import { generateUUID } from "@/utils/lib"
import { MessageTypes } from "@/constants/enum"
import { createTask, getUncompletedChatTasks, getUncompletedMentorTasks, updateTask, updateTaskStatus } from "@/services/task"
import useGetChat, { useGetChatMessages, useMessage } from "./useGetChat"

export const useGetUncompletedChatTasks = (userCourseId) => {
    return useQuery(['tasks', 'uncompleted', userCourseId], () => getUncompletedChatTasks(userCourseId), { staleTime: Infinity, cacheTime: Infinity })
}

export const useGetUncompletedMentorTasks = () => {
    return useQuery(['tasks', 'uncompleted'], () => getUncompletedMentorTasks(), { staleTime: Infinity, cacheTime: Infinity })
}

export const useTaskMutations = (userCourseId) => {
    const queryClient = useQueryClient()
    const { conversationId } = useGetChat(userCourseId)
    const { generateMessage } = useMessage()
    const { addNewMessage, updateMessage } = useGetChatMessages(conversationId)
    const createTaskMutation = useMutation({
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

    const statusChangeMutation = useMutation({
        mutationFn: updateTaskStatus,
        onMutate: (taskId) => updateTaskState(taskId, { isCompleted: true }),
    })

    function addNewTask(newTask) {
        const tempId = generateUUID()
        newTask = { ...newTask, id: tempId }
        const taskMessage = generateMessage(newTask, MessageTypes.TASK, { id: tempId })

        addNewMessage(taskMessage)
        queryClient.setQueryData(['tasks', 'uncompleted', userCourseId], (oldData) => {
            if (oldData?.length > 0) return [newTask, ...oldData]
            else return [newTask]
        })
        queryClient.invalidateQueries({ queryKey: ['tasks', 'uncompleted'], exact: true })

        return { tempId }
    }

    function updateTaskState(id, data) {
        updateMessage(
            id,
            (oldData) => ({ ...oldData, task: { ...oldData.task, ...data } }),
            (msg) => msg?.task?.id === id
        )
        queryClient.setQueriesData(['tasks', 'uncompleted'], (oldData) => {
            if (!oldData) return [data];
            return oldData.map(task => task?.id === id ? { ...task, ...data } : task);
        });
    }

    return {
        createTaskMutation,
        updateTaskMutation,
        statusChangeMutation
    }
}