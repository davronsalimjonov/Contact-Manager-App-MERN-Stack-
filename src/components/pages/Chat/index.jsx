import { useParams } from 'react-router-dom';
import useGetChat from '@/hooks/useGetChat';
import { getUserFullName } from '@/utils/lib';
import ChatConversation from '@/components/templates/ChatConversation';
import cls from './Chat.module.scss';
import Loader from '@/components/UI/atoms/Loader';

const Chat = () => {
    const { studentId, courseId } = useParams()
    const {
        info: { data: info, isLoading: isLoadingInfo },
        messages: { data: messages }
    } = useGetChat({ studentId, courseId })

    return (
        <div className={cls.page}>
            {!isLoadingInfo ? (
                <ChatConversation
                    partnerFullName={getUserFullName(info?.user)}
                    partnerPhoneNumber={info?.user?.phone}
                    messages={messages}
                />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Chat;