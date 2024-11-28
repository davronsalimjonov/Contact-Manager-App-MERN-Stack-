import { useQuery } from "react-query";
import { getChatInfo, getChatMessages } from "@/services/chat";

const useGetChat = (chatId) => {
    const info = useQuery(['chat', 'info', chatId], () => getChatInfo(chatId))
    const userChatId = info?.data?.id
    const messages = useQuery(['chat', 'messages', userChatId], () => getChatMessages(userChatId))

    return {
        info,
        messages
    }
}

export default useGetChat;