import { useQueryClient } from 'react-query';
import Loader from '@/components/UI/atoms/Loader';
import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import { getChatAboveMessages, getChatBellowMessages } from '@/services/chat';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';

const ChatConversation = ({
    chatId = '',
    partnerFullName = '',
    partnerPhoneNumber = '',
    messages = [],
    isLoadingMessages = false
}) => {
    const queryClient = useQueryClient()

    const handleBottomReach = async (lastMessageIndex) => {
        try {
            const lastMessage = messages?.at(-1)
            const newMessages = await getChatBellowMessages(chatId, { index: lastMessage?.index })
            queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => ([...oldData, ...newMessages]))
        } catch (error) {
            console.log(error);
        }
    }

    const handleTopReach = async () => {
        try {
            const firstMessage = messages[0]
            const newMessages = await getChatAboveMessages(chatId, { index: firstMessage?.index })
            queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => ([...newMessages, ...oldData]))
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
                chatId={chatId}
                    messages={messages}
                    onBottomReach={handleBottomReach}
                    onTopReach={handleTopReach}
                />
            )}
            <ConversationInput />
        </div>
    );
}

export default ChatConversation;