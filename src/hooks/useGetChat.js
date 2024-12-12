import { useQuery, useQueryClient } from "react-query";
import { MessageTypes } from "@/constants/enum";
import { getChatInfo, getChatMessages } from "@/services/chat";
import useGetUser from "./useGetUser";

export const useMessage = () => {
    const { data: user } = useGetUser()

    function generateMessage(data, type, options = {}) {
        switch (type) {
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
            case MessageTypes.COMMENT: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.COMMENT,
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

const useGetChat = (userCourseId) => {
    const queryClient = useQueryClient()
    const info = useQuery(['chat', 'info', userCourseId], () => getChatInfo(userCourseId), { staleTime: Infinity, cacheTime: Infinity })
    const userChatId = info?.data?.id
    const messages = useQuery(['chat', 'messages', userChatId], () => getChatMessages(userChatId), { staleTime: 0, cacheTime: 0 })

    const addPrevMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => ([newMessages, ...oldData]))
    }

    const addNextMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => ([...oldData, newMessages]))
    }

    const addNewMessage = (newMessage) => {
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => {
            const lastItems = oldData?.at(-1)?.items || []
            oldData.at(-1).items = [...lastItems, newMessage]
            return oldData
        })
    }

    const updateMessage = (id, data) => {
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => {
            return oldData?.map(message => ({
                ...message,
                items: message?.items?.map(item => {
                    if (item?.id === id) {
                        const newData = typeof data === 'function' ? data(item) : data
                        return { ...item, ...newData }
                    }

                    return item
                })
            }))
        })
    }

    return {
        info,
        messages: {
            messages: messages?.data?.reduce((acc, curr) => ([...acc, ...(curr?.items || [])]), []),
            ...messages,
        },
        addPrevMessages,
        addNextMessages,
        updateMessage,
        addNewMessage,
        userChatId
    }
}

export default useGetChat;