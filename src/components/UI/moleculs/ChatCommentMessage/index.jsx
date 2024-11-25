import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatCommentMessage.module.scss';

const ChatCommentMessage = ({
    text = '',
    fullName = '',
    time = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} time='Commented 19:01'>
            <div className={cls.comment}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatCommentMessage;