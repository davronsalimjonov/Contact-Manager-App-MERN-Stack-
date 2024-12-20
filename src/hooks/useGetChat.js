import { useQuery, useQueryClient } from "react-query";
import { MessageTypes } from "@/constants/enum";
import { getChatInfo, getChatMessages } from "@/services/chat";
import useGetUser, { useGetUserId } from "./useGetUser";

export const useMessage = () => {
    const { data: user } = useGetUser()

    function generateMessage(data, type, options = {}) {
        switch (type) {
            case MessageTypes.TASK: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.TASK,
                isViewed: false,
                shouldScroll: true,
                task: { mentor: user, isCompleted: false, ...data },
                ...options
            })
            case MessageTypes.TEXT: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.MESSAGE,
                isViewed: false,
                shouldScroll: true,
                message: { text: data, type: MessageTypes.TEXT, whoSended: "mentor", mentor: user },
                ...options
            })
            case MessageTypes.COMMENT: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.COMMENT,
                isViewed: false,
                shouldScroll: true,
                comment: { text: data, owner: user },
                ...options
            })
            case MessageTypes.CALL: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.CALL,
                isViewed: false,
                shouldScroll: true,
                call: { audio: '', duration: '' },
                ...options
            })
            case MessageTypes.SMS: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.SMS,
                isViewed: false,
                shouldScroll: true,
                sms: { text: data, sender: user },
                ...options
            })
            case MessageTypes.LESSON_TASK: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                isViewed: false,
                type: MessageTypes.LESSON_TASK,
                shouldScroll: true,
                homeTask: {
                    ...data,
                    status: 'send',
                    mentor: user,
                },
                ...options
            })
            default: return null
        }
    }

    return {
        generateMessage
    }
}

export const useGetChatMessages = (chatId) => {
    const queryClient = useQueryClient()
    const messages = useQuery(['chat', 'messages', chatId], () => getChatMessages(chatId), { staleTime: 0, cacheTime: 0 })

    const addPrevMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => ([newMessages, ...oldData]))
    }

    const addNextMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => ([...oldData, newMessages]))
    }

    const addNewMessage = (newMessage) => {
        queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => {
            const lastItems = oldData?.at(-1)?.items || []
            oldData.at(-1).items = [...lastItems, newMessage]
            return oldData
        })
    }

    const updateMessage = (id, data, condition) => {
        queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => {
            return oldData?.map(message => ({
                ...message,
                items: message?.items?.map(item => {
                    if (item?.id === id || (condition && condition(item))) {
                        const newData = typeof data === 'function' ? data(item) : data
                        return { ...item, ...newData }
                    }

                    return item
                })
            }))
        })
    }

    return {
        ...messages,
        messages: messages?.data?.reduce((acc, curr) => ([...acc, ...(curr?.items || [])]), []),
        updateMessage, 
        addPrevMessages,
        addNextMessages,
        addNewMessage
    }
}

const useGetChat = (userCourseId) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const info = useQuery(['chat', 'info', userCourseId], () => getChatInfo(userCourseId), { staleTime: Infinity, cacheTime: Infinity })
    const conversationId = info?.data?.id

    const removeUnreadedMessagesCount = (count) => {
        queryClient.setQueriesData(['students', userId], (students) => {
            const studentIndex = students?.findIndex(student => student.id === userCourseId);

            if (studentIndex === -1) {
                return students;
            }

            const updatedStudents = [...students];
            const [student] = updatedStudents.splice(studentIndex, 1);

            student.messageCount = Math.max((student.messageCount || 0) - count, 0);
            updatedStudents.unshift(student);

            return updatedStudents;
        })
    }

    return {
        ...info,
        removeUnreadedMessagesCount,
        conversationId,
    }
}

export default useGetChat;