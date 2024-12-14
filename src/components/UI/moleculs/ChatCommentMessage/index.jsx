import { getTimeFromDate } from '@/utils/time';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatCommentMessage.module.scss';

const ChatCommentMessage = ({
    text = '',
    fullName = '',
    time = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} date={time} time={`Commented ${getTimeFromDate(time)}`}>
            <div className={cls.comment}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatCommentMessage;