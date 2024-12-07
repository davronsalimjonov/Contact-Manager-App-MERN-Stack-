import dayjs from 'dayjs';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatSmsMessage.module.scss';

const ChatSmsMessage = ({
    text = '',
    fullName = '',
    time = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} time={`SMS ${dayjs(time).format('HH:mm')}`}>
            <div className={cls.sms}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatSmsMessage;