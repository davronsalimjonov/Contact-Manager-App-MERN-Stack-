import ChatConversation from '@/components/templates/ChatConversation';
import cls from './Chat.module.scss';

const Chat = () => {
    return (
        <div className={cls.page}>
            <ChatConversation />
        </div>
    );
}

export default Chat;