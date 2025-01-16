import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { getUserFullName } from "@/utils/lib";
import { MessageTypes } from "@/constants/enum";
import { useGetUserId } from "@/hooks/useGetUser";
import ChatSmsMessage from "../../moleculs/ChatSmsMessage";
import ChatCallMessage from "../../moleculs/ChatCallMessage";
import ChatTextMessage from "../../moleculs/ChatTextMessage";
import ChatImageMessage from "../../moleculs/ChatImageMessage";
import ChatVoiseMessage from "../../moleculs/ChatVoiseMessage";
import ChatDateSeparator from "../../moleculs/ChatDateSeparator";
import ChatCommentMessage from "../../moleculs/ChatCommentMessage";
import ChatHomeWorkMessage from "../../moleculs/ChatHomeWorkMessage";
import ChatLessonTaskMessage from "../../moleculs/ChatLessonTaskMessage";
import ChatTaskMessage from "../../moleculs/ChatTaskMessage";
import ChatFileMessage from "../../moleculs/ChatFileMessage";
import { USER_ROLES } from "@/constants";

const RenderMessage = memo(({
    message,
    onEditMessage,
    onMessageVisible,
    onTaskComplete
}) => {
    const userId = useGetUserId()
    const { ref } = useInView({
        threshold: 0.5,
        triggerOnce: true,
        skip: message?.isViewed,
        onChange: (isVisible) => {
            if (isVisible) {
                onMessageVisible?.(message)
                message.isViewed = true
            }
        }
    })

    const messageType = message?.type === MessageTypes.MESSAGE ? message?.message?.type : message?.type
    let owner = null

    if(message?.type === MessageTypes.MESSAGE) {
        owner = message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user
    } else if(message?.type === MessageTypes.COMMENT) {
        owner = message?.comment?.createdBy === USER_ROLES.SELLER ? message?.comment?.salesManager : message?.comment?.owner 
    } else if(message?.type === MessageTypes.TASK) {
        owner = message?.task?.createdBy === USER_ROLES.SELLER ? message?.task?.salesManager : message?.task?.mentor
    }
console.log(messageType, owner);

    switch (messageType) {
        case MessageTypes.TEXT:
            return (
                <div ref={ref}>
                    <ChatTextMessage
                        time={message?.createdAt}
                        message={message?.message?.text}
                        avatar={owner.url}
                        isSender={owner.id === userId}
                        fullName={getUserFullName(owner)}
                    />
                </div>
            );
        case MessageTypes.IMAGE:
            return (
                <div ref={ref}>
                    <ChatImageMessage
                        time={message?.createdAt}
                        imageUrl={message?.message?.file?.url}
                        width={message?.message?.file?.width}
                        height={message?.message?.file?.height}
                        avatar={owner.url}
                        fullName={getUserFullName(owner)}
                    />
                </div>
            );
        case MessageTypes.AUDIO:
            return (
                <div ref={ref}>
                    <ChatVoiseMessage
                        time={message?.createdAt}
                        audioUrl={message?.message?.file?.url}
                        avatar={owner?.url}
                        fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
                    />
                </div>
            )
        case MessageTypes.VOISE:
            return (
                <div ref={ref}>
                    <ChatVoiseMessage
                        time={message?.createdAt}
                        audioUrl={message?.message?.file?.url}
                        avatar={message?.message?.whoSended === 'mentor' ? message?.message?.mentor?.url : message?.message?.user?.url}
                        fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
                    />
                </div>
            );
        case MessageTypes.VIDEO:
            return (
                <ChatFileMessage
                    avatar={message?.message?.whoSended === 'mentor' ? message?.message?.mentor?.url : message?.message?.user?.url}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
                    time={message?.createdAt}
                    fileName={message?.message?.file?.fileName}
                    fileSize={message?.message?.file?.size}
                    fileUrl={message?.message?.file?.url}
                />
            );
        case MessageTypes.ANY_FILE:
            return (
                <ChatFileMessage
                    avatar={message?.message?.whoSended === 'mentor' ? message?.message?.mentor?.url : message?.message?.user?.url}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
                    time={message?.createdAt}
                    fileName={message?.message?.file?.fileName}
                    fileSize={message?.message?.file?.size}
                    fileUrl={message?.message?.file?.url}
                />
            );
        case MessageTypes.STUDENT_HOME_WORK:
            return (
                <div ref={ref}>
                    <ChatHomeWorkMessage
                        avatar={message?.studentHomeWork?.student?.url}
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
                </div>
            );
        case MessageTypes.TASK:
            return (
                <ChatTaskMessage
                    title={message?.task?.title}
                    deadline={message?.task?.date}
                    isCompleted={message?.task?.isCompleted}
                    avatar={message?.task?.mentor?.url}
                    fullName={getUserFullName(message?.task?.mentor)}
                    time={message?.createdAt}
                    onComplete={!message?.task?.isCompleted && (() => onTaskComplete?.(message?.task?.id))}
                />
            )
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
                    avatar={message?.comment?.owner?.url}
                    fullName={getUserFullName(message?.comment?.owner)}
                />
            );
        case MessageTypes.SMS:
            return (
                <ChatSmsMessage
                    avatar={message?.sms?.sender?.url}
                    fullName={getUserFullName(message?.sms?.sender)}
                    text={message?.sms?.text}
                    time={message?.createdAt}
                />
            );
        case MessageTypes.LESSON_TASK:
            return (
                <ChatLessonTaskMessage
                    avatar={message?.homeTask?.mentor?.url}
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