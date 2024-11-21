import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatCommentMessage.module.scss';

const ChatCommentMessage = () => {
    return (
        <ChatMessageLayout fullName='Diyora Shomamatova' time='Commented 19:01'>
            <div className={cls.comment}>
                <span>Bu test komment</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatCommentMessage;