import dayjs from 'dayjs';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatCommentMessage.module.scss';

const ChatCommentMessage = ({
    text = '',
    fullName = '',
    time = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} date={time} time={`Commented ${dayjs(time).format('HH:mm')}`}>
            <div className={cls.comment}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatCommentMessage;