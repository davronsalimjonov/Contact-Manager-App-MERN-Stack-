import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = ({
    message = '',
    fullName = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} time='19:01'>
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
}

export default ChatTextMessage;