import Avatar from 'react-avatar';
import { formatMessageDate, getTimeFromDate } from '@/utils/time';
import { CheckCircle, EventIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatTaskMessage.module.scss';

const ChatTaskMessage = ({
    title = '',
    deadline = '',
    isCompleted = false,
    avatar = '',
    fullName = '',
    time = '',
    onComplete
}) => {
    return (
        <ChatMessageLayout
            avatar={avatar}
            fullName={fullName}
            fullNamePreffix="task yaratdi"
            time={getTimeFromDate(time)}
        >
            <div className={cls.task}>
                <div className={cls.task__details}>
                    <div className={cls.task__details__icon}>
                        <EventIcon />
                        {isCompleted ? (
                            <span className={cls.task__details__icon__check}><CheckCircle /></span>
                        ) : (
                            <span className={cls.task__details__icon__status}></span>
                        )}
                    </div>
                    <h3 className={cls.task__details__title}>{title}</h3>
                    <span className={cls.task__details__deadline}>{formatMessageDate(deadline)}, {getTimeFromDate(deadline)}</span>
                    <div className={cls.task__details__user}>
                        <Avatar src={avatar} name={fullName} size={23} round />
                        <span className={cls.task__details__user__name}>{fullName}</span>
                    </div>
                </div>
                {!isCompleted && (
                    <div className={cls.task__actions}>
                        <Button rounded onClick={onComplete}>Bajarildi</Button>
                    </div>
                )}
            </div>
        </ChatMessageLayout>
    );
}

export default ChatTaskMessage;