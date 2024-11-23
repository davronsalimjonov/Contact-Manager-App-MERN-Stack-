import { useQuery } from "react-query";
import { getChatInfo, getChatMessages } from "@/services/chat";

const useGetChat = ({ studentId, courseId } = {}) => {
    const info = useQuery(['chat', 'info', studentId, courseId], () => getChatInfo(studentId, courseId))
    const chatId = info?.data?.id
    const messages = useQuery(['chat', 'messages', chatId], () => getChatMessages(chatId))

    return {
        info,
        messages
    }
}

export default useGetChat;