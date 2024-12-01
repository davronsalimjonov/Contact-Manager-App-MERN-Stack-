import { memo } from 'react';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTextMessage.module.scss';

const ChatTextMessage = memo(({
    message = '',
    fullName = ''
}) => {
    // if(fullName === 'Jamila Tursunova 492') console.log('render')
    return (
        <ChatMessageLayout fullName={fullName} time='19:01'>
            <div className={cls.message}>{message}</div>
        </ChatMessageLayout>
    );
})

export default ChatTextMessage;