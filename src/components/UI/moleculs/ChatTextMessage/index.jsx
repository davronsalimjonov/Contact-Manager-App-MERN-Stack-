import dayjs from 'dayjs';
import { memo } from 'react';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = memo(({
    message = '',
    fullName = '',
    date = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} time={dayjs(date).format('HH:mm')}>
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
})

export default ChatTextMessage;