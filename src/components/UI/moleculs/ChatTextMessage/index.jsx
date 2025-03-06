import { memo } from 'react';
import { getTimeFromDate } from '@/utils/time';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = memo(({
    time = '',
    message = '',
    fullName = '',
    isSender = true,
    isViewed = false,
    avatar = ''
}) => {
    return (
        <ChatMessageLayout 
            date={time}
            fullName={fullName} 
            time={getTimeFromDate(time)}
            isSender={isSender}
            avatar={avatar}
            isViewed={isViewed}
            showViewedStatus
        >
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
})

export default ChatTextMessage;