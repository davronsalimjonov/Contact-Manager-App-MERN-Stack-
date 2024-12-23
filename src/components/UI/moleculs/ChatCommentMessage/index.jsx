import { getTimeFromDate } from '@/utils/time';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatCommentMessage.module.scss';

const ChatCommentMessage = ({
    text = '',
    fullName = '',
    avatar = '',
    time = ''
}) => {
    return (
        <ChatMessageLayout 
            date={time}
            avatar={avatar} 
            fullName={fullName} 
            time={`Commented ${getTimeFromDate(time)}`}
        >
            <div className={cls.comment}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatCommentMessage;