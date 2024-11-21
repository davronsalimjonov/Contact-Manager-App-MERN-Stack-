import { useParams } from 'react-router-dom';
import useGetChat from '@/hooks/useChat';
import { getUserFullName } from '@/utils/lib';
import ChatConversation from '@/components/templates/ChatConversation';
import cls from './Chat.module.scss';

const Chat = () => {
    const { studentId, courseId } = useParams()
    const {
        info: { data: info },
        messages: { data: messages }
    } = useGetChat({ studentId, courseId })

    return (
        <div className={cls.page}>
            <ChatConversation 
                partnerFullName={getUserFullName(info?.user)}
                partnerPhoneNumber={info?.user?.phone}
                messages={messages}
            />
        </div>
    );
}

export default Chat;