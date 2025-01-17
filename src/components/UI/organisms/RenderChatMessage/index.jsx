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
import { getMessageOwner } from "@/utils/chat";

const RenderMessage = memo(({
    message,
    skipObserver = false,
    onEditMessage,
    onMessageVisible,
    onTaskComplete
}) => {
    const userId = useGetUserId()
    const { ref } = useInView({
        threshold: 0.5,
        triggerOnce: true,
        skip: skipObserver,
        onChange: (isVisible) => {
            if (isVisible) {
                onMessageVisible?.(message)
                message.isViewed = true
            }
        }
    })

    const messageType = message?.type === MessageTypes.MESSAGE ? message?.message?.type : message?.type
    const owner = getMessageOwner(message)

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
                        fullName={getUserFullName(owner)}
                    />
                </div>
            )
        case MessageTypes.VOISE:
            return (
                <div ref={ref}>
                    <ChatVoiseMessage
                        time={message?.createdAt}
                        audioUrl={message?.message?.file?.url}
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                    />
                </div>
            );
        case MessageTypes.VIDEO:
            return (
                <div ref={ref}>
                    <ChatFileMessage
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                        time={message?.createdAt}
                        fileName={message?.message?.file?.fileName}
                        fileSize={message?.message?.file?.size}
                        fileUrl={message?.message?.file?.url}
                    />
                </div>
            );
        case MessageTypes.ANY_FILE:
            return (
                <div ref={ref}>
                    <ChatFileMessage
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                        time={message?.createdAt}
                        fileName={message?.message?.file?.fileName}
                        fileSize={message?.message?.file?.size}
                        fileUrl={message?.message?.file?.url}
                    />
                </div>
            );
        case MessageTypes.STUDENT_HOME_WORK:
            return (
                <div ref={ref}>
                    <ChatHomeWorkMessage
                        fullName={getUserFullName(owner)}
                        avatar={owner?.url}
                        onTime={new Date(message?.createdAt).getTime() <= new Date(message?.studentHomeWork?.homeTask?.date).getTime()}
                        time={message?.createdAt}
                        workId={message?.studentHomeWork?.id}
                        rate={message?.studentHomeWork?.rate}
                        taskId={message?.studentHomeWork?.homeTask?.id}
                        fileName={message?.studentHomeWork?.file?.fileName}
                        fileSize={message?.studentHomeWork?.file?.size}
                        fileUrl={message?.studentHomeWork?.file?.url}
                        taskTitle={message?.studentHomeWork?.homeTask?.title}
                        taskDescription={message?.studentHomeWork?.homeTask?.description}
                        taskDate={message?.studentHomeWork?.homeTask?.date}
                    />
                </div>
            );
        case MessageTypes.TASK:
            return (
                <div ref={ref}>
                    <ChatTaskMessage
                        title={message?.task?.title}
                        deadline={message?.task?.date}
                        isCompleted={message?.task?.isCompleted}
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                        dischargerAvatar={message?.task?.mentor?.url}
                        dischargerFullName={getUserFullName(message?.task?.mentor)}
                        time={message?.createdAt}
                        onComplete={!message?.task?.isCompleted && (() => onTaskComplete?.(message?.task?.id))}
                    />
                </div>
            )
        case MessageTypes.CALL:
            return (
                <div ref={ref}>
                    <ChatCallMessage
                        recordUrl={message?.call?.audio}
                        recordDuration={message?.call?.duration}
                    />
                </div>
            );
        case MessageTypes.COMMENT:
            return (
                <div ref={ref}>
                    <ChatCommentMessage
                        time={message?.createdAt}
                        text={message?.comment?.text}
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                    />
                </div>
            );
        case MessageTypes.SMS:
            return (
                <div ref={ref}>
                    <ChatSmsMessage
                        avatar={owner?.url}
                        fullName={getUserFullName(owner)}
                        text={message?.sms?.text}
                        time={message?.createdAt}
                    />
                </div>
            );
        case MessageTypes.LESSON_TASK:
            return (
                <div ref={ref}>
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
                </div>
            );
        case MessageTypes.DATE_SEPARATOR:
            return (
                <ChatDateSeparator date={message?.date} />
            );
        default: return <></>;
    }
});

export default RenderMessage;