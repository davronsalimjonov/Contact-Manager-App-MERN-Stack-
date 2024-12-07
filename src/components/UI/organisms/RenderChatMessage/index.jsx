import { memo } from "react";
import { MessageTypes } from "@/constants/enum";
import { getUserFullName } from "@/utils/lib";
import ChatCallMessage from "../../moleculs/ChatCallMessage";
import ChatTextMessage from "../../moleculs/ChatTextMessage";
import ChatCommentMessage from "../../moleculs/ChatCommentMessage";
import ChatDateSeparator from "../../moleculs/ChatDateSeparator";
import ChatSmsMessage from "../../moleculs/ChatSmsMessage";

const RenderMessage = memo(({ message }) => {
    switch (message?.type) {
        case MessageTypes.TEXT:
            return (
                <ChatTextMessage
                    time={message?.createdAt}
                    message={message?.message?.text}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + message?.index}
                />
            );
        case MessageTypes.CALL:
            return (
                <ChatCallMessage
                    recordUrl={message?.call?.audio}
                    recordDuration={message?.call?.duration}
                />
            );
        case MessageTypes.COMMENT:
            return (
                <ChatCommentMessage
                    time={message?.createdAt}
                    text={message?.comment?.text}
                    fullName={getUserFullName(message?.comment?.owner)}
                />
            );
        case MessageTypes.SMS: return (
            <ChatSmsMessage 
                fullName={getUserFullName(message?.sms?.sender)}
                text={message?.sms?.text}
                time={message?.createdAt}
            />
        );
        case MessageTypes.DATE_SEPARATOR:
            return (
                <ChatDateSeparator date={message?.date} />
            );
        default: return null;
    }
});

export default RenderMessage;