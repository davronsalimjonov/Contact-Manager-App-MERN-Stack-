import { memo } from "react";
import { getUserFullName } from "@/utils/lib";
import { MessageTypes } from "@/constants/enum";
import { useGetUserId } from "@/hooks/useGetUser";
import ChatCallMessage from "../../moleculs/ChatCallMessage";
import ChatTextMessage from "../../moleculs/ChatTextMessage";
import ChatCommentMessage from "../../moleculs/ChatCommentMessage";
import ChatDateSeparator from "../../moleculs/ChatDateSeparator";
import ChatSmsMessage from "../../moleculs/ChatSmsMessage";
import ChatLessonTaskMessage from "../../moleculs/ChatLessonTaskMessage";

const RenderMessage = memo(({ message }) => {
    const userId = useGetUserId()

    switch (message?.type) {
        case MessageTypes.TEXT:
            return (
                <ChatTextMessage
                    time={message?.createdAt}
                    message={message?.message?.text}
                    avatar={message?.message?.whoSended === 'mentor' ? message?.message?.mentor?.avatar : message?.message?.user?.avatar}
                    isSender={message?.message?.whoSended === 'mentor' && message?.message?.mentor?.id === userId}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
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
        case MessageTypes.SMS:
            return (
                <ChatSmsMessage
                    fullName={getUserFullName(message?.sms?.sender)}
                    text={message?.sms?.text}
                    time={message?.createdAt}
                />
            );
        case MessageTypes.LESSON_TASK:
            return (
                <ChatLessonTaskMessage
                    fullName={getUserFullName(message?.homeTask?.mentor)}
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