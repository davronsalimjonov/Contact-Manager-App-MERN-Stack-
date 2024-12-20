import { useParams } from 'react-router-dom';
import useGetChat from '@/hooks/useGetChat';
import { getUserFullName } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import ChatSidebar from '@/components/templates/ChatSidebar';
import ChatConversation from '@/components/templates/ChatConversation';
import cls from './Chat.module.scss';

const Chat = () => {
    const { userCourseId } = useParams()
    const { data: info, isLoading: isLoadingInfo, conversationId } = useGetChat(userCourseId)

    return (
        <div className={cls.page}>
            {!isLoadingInfo ? (
                <>
                    <ChatConversation
                        userCourseId={userCourseId}
                        conversationId={conversationId}
                        partnerFullName={getUserFullName(info?.user)}
                        partnerPhoneNumber={info?.user?.phone}
                    />
                    <ChatSidebar
                        conversationId={conversationId}
                        userCourseId={userCourseId} 
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Chat;