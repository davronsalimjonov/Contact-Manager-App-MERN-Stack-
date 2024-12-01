import { useQuery, useQueryClient } from "react-query";
import { getChatInfo, getChatMessages } from "@/services/chat";

const useGetChat = (chatId) => {
    const queryClient = useQueryClient()
    const info = useQuery(['chat', 'info', chatId], () => getChatInfo(chatId))
    const userChatId = info?.data?.id
    const messages = useQuery(['chat', 'messages', userChatId], () => getChatMessages(userChatId))

    const addPrevMessages = (newMessages = []) => {
        if(Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => ([...newMessages, ...oldData]))
    }

    const addNextMessages = (newMessages = []) => {
        if(Array.isArray(newMessages) && !newMessages?.length) return
        queryClient.setQueryData(['chat', 'messages', userChatId], (oldData) => ([...oldData, ...newMessages]))
    }

    return {
        info,
        messages,
        addPrevMessages,
        addNextMessages
    }
}

export default useGetChat;