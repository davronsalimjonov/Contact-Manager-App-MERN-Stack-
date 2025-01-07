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
                        userAvatar={info?.user?.url}
                        userFullName={getUserFullName(info?.user)}
                        conversationId={conversationId}
                        userCourseId={userCourseId}
                        firstPhoneNumber={info?.user?.phone}
                        secondPhoneNumber={info?.user?.secondPhone}
                        thirdPhoneNumber={info?.user?.thirdPhone}
                        status={info?.userCourse?.status}
                        email={info?.user?.email}
                        comment={info?.userCourse?.comment}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Chat;