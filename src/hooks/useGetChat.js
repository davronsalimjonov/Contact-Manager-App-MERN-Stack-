import { useQuery, useQueryClient } from "react-query";
import { isSameDay } from "@/utils/time";
import { fileToObject, getFileType } from "@/utils/lib";
import { MessageTypes } from "@/constants/enum";
import { getChatInfo, getChatMessages } from "@/services/chat";
import useGetUser, { useGetUserId } from "./useGetUser";

export const useGetChatMessages = (chatId) => {
    const queryClient = useQueryClient()
    const messages = useQuery(['chat', 'messages', chatId], () => getChatMessages(chatId), { staleTime: 60, cacheTime: 60 })

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

export const useMessage = (conversationId) => {
    const { data: user } = useGetUser()
    const { messages } = useGetChatMessages(conversationId)

    const lastMessage = messages?.at(-1)
    const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
    const dateSeperator = isNewMessageInPeriod ? new Date(Date.now()).toISOString() : null 

    async function generateMessage(data, type, options = {}) {
        let messageType = type

        if(messageType === MessageTypes.MESSAGE) {
            if(data?.file){
                const type = getFileType(data?.file)
                const fileObj = await fileToObject(data?.file)
                const specialTypes = [MessageTypes.IMAGE, MessageTypes.AUDIO, MessageTypes.VIDEO]

                data.caption = data?.message
                data.file = fileObj
                delete data.message

                if(specialTypes.includes(type)){
                    messageType = type
                } else {
                    messageType = MessageTypes.ANY_FILE
                }
            } else {
                messageType = MessageTypes.TEXT
            }
        }

        switch (type) {
            case MessageTypes.TASK: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.TASK,
                isViewed: false,
                shouldScroll: true,
                dateSeperator,
                task: { mentor: user, isCompleted: false, ...data },
                ...options
            })
            case MessageTypes.MESSAGE: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.MESSAGE,
                isViewed: false,
                shouldScroll: true,
                dateSeperator,
                message: { ...data, type: messageType, whoSended: "mentor", mentor: user },
                ...options
            })
            case MessageTypes.COMMENT: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.COMMENT,
                isViewed: false,
                shouldScroll: true,
                dateSeperator,
                comment: { text: data.message, owner: user },
                ...options
            })
            case MessageTypes.CALL: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.CALL,
                isViewed: false,
                shouldScroll: true,
                dateSeperator,
                call: { audio: '', duration: '' },
                ...options
            })
            case MessageTypes.SMS: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                type: MessageTypes.SMS,
                isViewed: false,
                shouldScroll: true,
                dateSeperator,
                sms: { text: data.message, sender: user },
                ...options
            })
            case MessageTypes.LESSON_TASK: return ({
                id: Date.now().toString(),
                createdAt: new Date(Date.now()).toISOString(),
                isViewed: false,
                type: MessageTypes.LESSON_TASK,
                shouldScroll: true,
                dateSeperator,
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

    return { generateMessage }
}

export default useGetChat;