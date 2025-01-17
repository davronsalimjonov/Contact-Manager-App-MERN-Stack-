import { useEffect, useRef } from 'react';
import { debounce } from '@/utils/lib';
import { socket } from '@/services/socket';
import { MessageTypes } from '@/constants/enum';
import { useGetUserId } from '@/hooks/useGetUser';
import Loader from '@/components/UI/atoms/Loader';
import useGetChat, { useGetChatMessages } from '@/hooks/useGetChat';
import ChatMessageEditProvider from '@/providers/ChatMessageEditProvider';
import ConversationInput from '@/components/UI/organisms/ConversationInput';
import ConversationHeader from '@/components/UI/organisms/ConversationHeader';
import ConversationMessages from '@/components/UI/organisms/ConversationMessages';
import { getChatAboveMessages, getChatBellowMessages, sendViewedMessages } from '@/services/chat';
import cls from './ChatConversation.module.scss';
import { getMessageOwner } from '@/utils/chat';

let soundTimer = null

const ChatConversation = ({
    userCourseId = '',
    conversationId = '',
    partnerFullName = '',
    partnerPhoneNumber = '',
    allowedMessagesTypes
}) => {
    const userId = useGetUserId()
    const unreadedMessages = useRef({ ids: [], index: null })
    const { data: chatInfo, removeUnreadedMessagesCount, addUnreadedMessagesCount } = useGetChat(userCourseId)
    const { data, messages, isLoading: isLoadingMessages, addPrevMessages, addNextMessages, addNewMessage } = useGetChatMessages(conversationId)

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

    const debouncedFunc = debounce((data) => {
        if (data?.ids?.length) {
            sendViewedMessages(conversationId, data)
            removeUnreadedMessagesCount(data?.ids?.length)
            unreadedMessages.current = { ids: [], index: null }
        }
    }, 300)

    const handleMessageVisible = (message) => {
        const messageOwner = getMessageOwner(message)
        const messageSenderId = messageOwner?.id

        if (messageSenderId && messageSenderId !== userId) {
            if (!unreadedMessages.current?.ids?.includes(messageSenderId)) {
                unreadedMessages.current.ids = [...unreadedMessages.current.ids, message?.id]
                unreadedMessages.current.index = message?.index
            }
        } else return

        debouncedFunc(unreadedMessages.current)
    }

    useEffect(() => {
        if (socket && conversationId) {
            const handleReceiveNewMessage = (newMessage) => {
                addNewMessage(newMessage);
                addUnreadedMessagesCount(1)

                if (!soundTimer) {
                    const audio = new Audio('/audio/new-message-came.mp3')
                    audio.play();

                    soundTimer = setTimeout(() => {
                        soundTimer = null;
                    }, 300);
                }
            }

            socket.emit('join-room', conversationId)
            socket.on('receive-room-message', handleReceiveNewMessage)

            return () => {
                socket.emit('leave-room', conversationId)
                socket.removeAllListeners('receive-room-message', handleReceiveNewMessage)
            }
        }
    }, [socket, conversationId])

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
                        userCourseId={userCourseId}
                        messages={messages}
                        onTopReach={handleTopReach}
                        onBottomReach={handleBottomReach}
                        onMessageVisible={handleMessageVisible}
                        initialMessageIndex={data?.[0]?.index}
                        hasAboveMessages={typeof data?.[0]?.above === 'boolean' ? data?.[0]?.above : undefined}
                        hasBelowMessages={typeof data?.[0]?.bellow === 'boolean' ? data?.[0]?.bellow : undefined}
                        unreadedMessagesCount={chatInfo?.count || 0}
                    />
                )}
                <ConversationInput 
                    userCourseId={userCourseId}
                    allowedMessagesTypes={allowedMessagesTypes} 
                />
            </div>
        </ChatMessageEditProvider>
    );
}

export default ChatConversation;