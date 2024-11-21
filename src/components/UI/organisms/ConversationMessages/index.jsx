import { Fragment } from 'react';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import ChatDateLine from '../../moleculs/ChatDateLine';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import cls from './ConversationMessages.module.scss';
import { getUserFullName } from '@/utils/lib';

const ConversationMessages = ({
    messages = []
}) => {
    console.log(messages);

    const RenderMessage = (message) => {
        switch (message?.type) {
            case 'message': return (
                <ChatTextMessage 
                    key={message?.id}
                    // senderFullName={getUserFullName(message?.user)}
                    message={message?.message?.text}
                />
            );
            case 'call': return (
                <ChatCallMessage 
                    key={message?.id}
                    recordUrl={message?.call?.audio}
                    recordDuration={message?.call?.duration}
                />
            );
            default: return <Fragment key={message?.id}></Fragment>;
        }
    }

    return (
        <div className={cls.chat}>
            {messages?.length > 0 && messages.map(RenderMessage)}
        </div>
    );
}

export default ConversationMessages;