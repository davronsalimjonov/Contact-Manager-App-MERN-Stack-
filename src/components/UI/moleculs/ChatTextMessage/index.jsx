import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = ({
    message = ''
}) => {
    return (
        <ChatMessageLayout fullName='Diyora Shomamatova' time='19:01'>
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
}

export default ChatTextMessage;