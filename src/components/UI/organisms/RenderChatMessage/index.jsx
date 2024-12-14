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
import ChatVoiseMessage from "../../moleculs/ChatVoiseMessage";
import ChatHomeWorkMessage from "../../moleculs/ChatHomeWorkMessage";
import ChatImageMessage from "../../moleculs/ChatImageMessage";

const RenderMessage = memo(({
    message,
    onEditMessage
}) => {
    const userId = useGetUserId()

    const messageType = message?.type === MessageTypes.MESSAGE ? message?.message?.type : message?.type

    switch (messageType) {
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
        case MessageTypes.IMAGE: 
            return (
                <ChatImageMessage 
                    imageUrl={message?.message?.url}
                />
            );
        case MessageTypes.VOISE:
            return (
                <ChatVoiseMessage
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
                    time={message?.createdAt}
                    audioUrl={message?.message?.url}
                />
            );
        case MessageTypes.STUDENT_HOME_WORK:
            return (
                <ChatHomeWorkMessage
                    onTime={new Date(message?.createdAt).getTime() <= new Date(message?.studentHomeWork?.homeTask?.date).getTime()}
                    time={message?.createdAt}
                    workId={message?.studentHomeWork?.id}
                    rate={message?.studentHomeWork?.rate}
                    taskId={message?.studentHomeWork?.homeTask?.id}
                    fileName={message?.studentHomeWork?.file?.fileName}
                    fileSize={message?.studentHomeWork?.file?.size}
                    fileUrl={message?.studentHomeWork?.file?.url}
                    fullName={getUserFullName(message?.studentHomeWork?.student)}
                    taskTitle={message?.studentHomeWork?.homeTask?.title}
                    taskDescription={message?.studentHomeWork?.homeTask?.description}
                    taskDate={message?.studentHomeWork?.homeTask?.date}
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
                    title={message?.homeTask?.title}
                    file={message?.homeTask?.url}
                    description={message?.homeTask?.description}
                    time={message?.createdAt}
                    date={message?.homeTask?.date}
                    status={message?.homeTask?.status}
                    onEdit={onEditMessage}
                />
            );
        case MessageTypes.DATE_SEPARATOR:
            return (
                <ChatDateSeparator date={message?.date} />
            );
        default: return <></>;
    }
});

export default RenderMessage;