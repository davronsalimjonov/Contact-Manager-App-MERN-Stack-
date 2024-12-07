import dayjs from 'dayjs';
import { memo } from 'react';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = memo(({
    time = '',
    message = '',
    fullName = '',
    isSender = true,
    avatar = ''
}) => {
    return (
        <ChatMessageLayout 
            fullName={fullName} 
            time={dayjs(time).format('HH:mm')}
            isSender={isSender}
            date={time}
            avatar={avatar}
        >
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
})

export default ChatTextMessage;