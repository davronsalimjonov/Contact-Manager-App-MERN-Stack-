import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';
import Loader from '@/components/UI/atoms/Loader';
import { getChatBellowMessages } from '@/services/chat';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

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
            const lastMessage = messages[lastMessageIndex]
            const newMessages = await getChatBellowMessages(chatId, { index: lastMessage?.index })
            queryClient.setQueryData(['chat', 'messages', chatId], (oldData) => ([...oldData, ...newMessages]))
        } catch (error) {
            toast.error('error')
        }
    }

    const handleTopReach = async () => {
        try {   
            
        } catch (error) {
            
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
                />
            )}
            <ConversationInput />
        </div>
    );
}

export default ChatConversation;