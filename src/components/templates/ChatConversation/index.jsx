import useGetChat from '@/hooks/useGetChat';
import Loader from '@/components/UI/atoms/Loader';
import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import { getChatAboveMessages, getChatBellowMessages } from '@/services/chat';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';

const ChatConversation = ({
    chatId = '',
    conversationId = '',
    partnerFullName = '',
    partnerPhoneNumber = '',
    messages = [],
    isLoadingMessages = false
}) => {
    const {addPrevMessages, addNextMessages} = useGetChat(chatId)

    const handleBottomReach = async (beforeBottomReach) => {
        try {
            const lastMessage = messages?.at(-1)
            const newMessages = await getChatBellowMessages(conversationId, { index: lastMessage?.index })
            beforeBottomReach?.(newMessages?.length)
            addNextMessages(newMessages)
        } catch (error) {
            console.log(error);
        }
    }

    const handleTopReach = async (beforeTopReach) => {
        try {
            const firstMessage = messages[0]
            const newMessages = await getChatAboveMessages(conversationId, { index: firstMessage?.index })
            beforeTopReach?.(newMessages?.length)
            addPrevMessages(newMessages)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cls.chat}>
            <ConversationHeader
                fullName={partnerFullName}
                phoneNumber={partnerPhoneNumber}
            />
            {isLoadingMessages ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <ConversationMessages
                    messages={messages}
                    onBottomReach={handleBottomReach}
                    onTopReach={handleTopReach}
                />
            )}
            <ConversationInput chatId={chatId} />
        </div>
    );
}

export default ChatConversation;