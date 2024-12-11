import useGetChat from '@/hooks/useGetChat';
import Loader from '@/components/UI/atoms/Loader';
import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import { getChatAboveMessages, getChatBellowMessages } from '@/services/chat';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import cls from './ChatConversation.module.scss';
import ChatMessageEditProvider from '@/providers/ChatMessageEditProvider';

const ChatConversation = ({
    userCourseId = '',
    conversationId = '',
    partnerFullName = '',
    partnerPhoneNumber = '',
}) => {
    const { addPrevMessages, addNextMessages, messages: { data, messages, isLoading: isLoadingMessages } } = useGetChat(userCourseId)

    const handleTopReach = async (beforeTopReach) => {
        try {
            const firstMessage = messages?.find(msg => msg?.index)
            const newMessages = await getChatAboveMessages(conversationId, { index: firstMessage?.index })
            beforeTopReach?.(newMessages?.above)
            addPrevMessages(newMessages)
        } catch (error) {
            console.log(error);
        }
    }

    const handleBottomReach = async (beforeBottomReach) => {
        try {
            const lastMessage = messages?.at(-1)
            const newMessages = await getChatBellowMessages(conversationId, { index: lastMessage?.index })
            beforeBottomReach?.(newMessages?.bellow)
            addNextMessages(newMessages)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ChatMessageEditProvider>
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
                        onTopReach={handleTopReach}
                        onBottomReach={handleBottomReach}
                        initialMessageIndex={data?.[0]?.index}
                        hasAboveMessages={typeof data?.[0]?.above === 'boolean' ? data?.[0]?.above : undefined}
                        hasBelowMessages={typeof data?.[0]?.bellow === 'boolean' ? data?.[0]?.bellow : undefined}
                    />
                )}
                <ConversationInput userCourseId={userCourseId} />
            </div>
        </ChatMessageEditProvider>
    );
}

export default ChatConversation;