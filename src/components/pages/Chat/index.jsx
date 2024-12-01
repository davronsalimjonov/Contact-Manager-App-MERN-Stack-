import { useParams } from 'react-router-dom';
import useGetChat from '@/hooks/useGetChat';
import { getUserFullName } from '@/utils/lib';
import ChatConversation from '@/components/templates/ChatConversation';
import cls from './Chat.module.scss';
import Loader from '@/components/UI/atoms/Loader';
import ChatSidebar from '@/components/templates/ChatSidebar';

const Chat = () => {
    const { chatId } = useParams()
    const {
        info: { data: info, isLoading: isLoadingInfo },
        messages: { data: messages, isLoadingMessages }
    } = useGetChat(chatId)

    return (
        <div className={cls.page}>
            {!isLoadingInfo ? (
                <ChatConversation
                    chatId={chatId}
                    conversationId={info?.id}
                    partnerFullName={getUserFullName(info?.user)}
                    partnerPhoneNumber={info?.user?.phone}
                    messages={messages}
                    isLoadingMessages={isLoadingMessages}
                />
            ) : (
                <Loader />
            )}
            <ChatSidebar />
        </div>
    );
}

export default Chat;