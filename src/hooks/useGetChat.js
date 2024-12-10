import { useQuery, useQueryClient } from "react-query";
import { getChatInfo, getChatMessages } from "@/services/chat";
import useGetUser from "./useGetUser";

export const useMessage = () => {
    const { data: user } = useGetUser()

    function generateMessage(data, type, options = {}) {
        switch (type) {
            case 'message': return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: "message",
                isViewed: false,
                shouldScroll: true,
                message: { text: data, whoSended: "mentor", mentor: user },
                ...options
            })
            case 'comment': return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: "comment",
                isViewed: false,
                shouldScroll: true,
                comment: { text: data, owner: user },
                ...options
            })
            case 'call': return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: "call",
                isViewed: false,
                shouldScroll: true,
                call: { audio: '', duration: '' },
                ...options
            })
            case 'sms': return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: "comment",
                isViewed: false,
                shouldScroll: true,
                sms: { text: data, sender: user },
                ...options
            })
            case 'home-task': return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                isViewed: false,
                type: 'home-task',
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
            console.log(oldData);

            return oldData?.map(message => ({
                ...message,
                items: message?.items?.map(item => item?.id === id ? { ...item, ...data } : item)
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
        addNewMessage
    }
}

export default useGetChat;