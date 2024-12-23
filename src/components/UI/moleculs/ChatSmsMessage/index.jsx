import { getTimeFromDate } from '@/utils/time';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatSmsMessage.module.scss';

const ChatSmsMessage = ({
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
            time={`SMS ${getTimeFromDate(time)}`}
        >
            <div className={cls.sms}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatSmsMessage;