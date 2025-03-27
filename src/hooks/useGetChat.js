import { useQuery, useQueryClient } from "react-query";
import { isSameDay } from "@/utils/time";
import { fileToObject, getFileType } from "@/utils/lib";
import { MessageTypes } from "@/constants/enum";
import { getChatInfo, getChatMessages } from "@/services/chat";
import useGetUser, { useGetUserId } from "./useGetUser";
import { EMPLOYEE_ROLES } from "@/constants/enum";

export const useGetChatMessages = (chatId) => {
    const queryClient = useQueryClient()
    const queryKey = ['chat', 'messages', chatId]
    const messages = useQuery(queryKey, () => getChatMessages(chatId), { staleTime: 60, cacheTime: 60 })

    const addPrevMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(queryKey, (oldData) => ([newMessages, ...oldData]))
    }

    const addNextMessages = (newMessages = {}) => {
        if (Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(queryKey, (oldData) => ([...oldData, newMessages]))
    }

    const addNewMessage = (newMessage) => {
        const hasBellowMessages = messages?.data?.at(-1)?.bellow

        if (hasBellowMessages) {
            setTimeout(() => {
                queryClient.removeQueries({ queryKey })
                queryClient.invalidateQueries({ queryKey })
            }, 100)
        } else {
            queryClient.setQueryData(queryKey, (oldData) => {
                const lastItems = oldData?.at(-1)?.items || []
                oldData.at(-1).items = [...lastItems, newMessage]
                return oldData
            })
        }
    }

    const updateMessage = (id, data, condition) => {
        queryClient.setQueryData(queryKey, (oldData) => {
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

    const setIsViewedMessages = (ids = []) => {
        queryClient.setQueryData(queryKey, (oldData) => {
            return oldData?.map(message => ({
                ...message,
                items: message?.items?.map(item => {
                    if (ids?.includes(item?.id)) item.isViewed = true
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
        addNewMessage,
        setIsViewedMessages
    }
}

const  useGetChat = (userCourseId) => {
    const userId = useGetUserId()
    const { data: user } = useGetUser()
    const userRole = user?.role
    const queryClient = useQueryClient()
    const info = useQuery(['chat', 'info', userCourseId], () => getChatInfo(userCourseId), { staleTime: Infinity, cacheTime: Infinity })
    const conversationId = info?.data?.id

    const removeUnreadedMessagesCount = (count) => {
        let studentsQueryKey = null

        if (userRole === EMPLOYEE_ROLES.SELLER || userRole === EMPLOYEE_ROLES.SALES_TEAM_LEADER) studentsQueryKey = ['seller-students', userId]
        else if (userRole === EMPLOYEE_ROLES.CALL_MENTOR) studentsQueryKey = ['students', userId]
        else if (userRole === EMPLOYEE_ROLES.MAIN_MENTOR) studentsQueryKey = ['students', userId]

        queryClient.setQueriesData(['chat', 'info', userCourseId], (oldData) => ({ ...oldData, count: Math.max(oldData?.count - count, 0) }))
        if (studentsQueryKey) {
            queryClient.setQueriesData(studentsQueryKey, (students) => {
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
    }

    const addUnreadedMessagesCount = (count) => {
        queryClient.setQueriesData(['chat', 'info', userCourseId], (oldData) => ({ ...oldData, count: (oldData?.count || 0) + count }))
    }

    return {
        ...info,
        removeUnreadedMessagesCount,
        addUnreadedMessagesCount,
        conversationId,
    }
}

export const useMessage = (userCourseId) => {
    const { data: user } = useGetUser()
    const { conversationId, data: chatInfo } = useGetChat(userCourseId)
    const { messages } = useGetChatMessages(conversationId)

    const userRole = user?.role
    const mentor = chatInfo?.userCourse?.secondTeacher
    const lastMessage = messages?.at(-1)
    const isNewMessageInPeriod = !isSameDay(lastMessage?.createdAt, new Date(Date.now()))
    const dateSeperator = isNewMessageInPeriod ? new Date(Date.now()).toISOString() : null

    async function generateMessage(data, type, options = {}) {
        let messageType = type

        if (messageType === MessageTypes.MESSAGE) {
            if (data?.file) {
                const type = getFileType(data?.file)
                const fileObj = await fileToObject(data?.file)
                const specialTypes = [MessageTypes.IMAGE, MessageTypes.AUDIO, MessageTypes.VIDEO]

                data.caption = data?.message
                data.file = fileObj
                delete data.message

                if (specialTypes.includes(type)) {
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
                task: {
                    mentor: userRole === EMPLOYEE_ROLES.SELLER ? mentor : user,
                    isCompleted: false,
                    createdBy: userRole,
                    salesManager: userRole === EMPLOYEE_ROLES.SELLER ? user : null,
                    ...data
                },
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
                comment: { 
                    text: data.message, 
                    owner: ![EMPLOYEE_ROLES.SELLER, EMPLOYEE_ROLES.SALES_TEAM_LEADER].includes(userRole) ? mentor : null, 
                    salesManager: [EMPLOYEE_ROLES.SELLER, EMPLOYEE_ROLES.SALES_TEAM_LEADER].includes(userRole) ? user : null, 
                    createdBy: userRole 
                },
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