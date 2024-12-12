import dayjs from 'dayjs';
import { formatMessageDate } from '@/utils/time';
import Button from '../../atoms/Buttons/Button';
import { DownloadIcon, PinBoardUnreaded } from '../../atoms/icons';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatLessonTaskMessage.module.scss';
import { HomeLessonTaskStatus } from '@/constants/enum';

const ChatLessonTaskMessage = ({
    fullName = '',
    time = '',
    file = '',
    title = '',
    description = '',
    status = HomeLessonTaskStatus.SEND,
    onEdit
}) => {
    return (
        <ChatMessageLayout fullName={fullName}>
            <div className={cls.message}>
                <div className={cls.message__body}>
                    <div className={cls.message__body__icon}>
                        <PinBoardUnreaded />
                    </div>
                    <div className={cls.message__body__details}>
                        <div className={cls.message__body__details__header}>
                            <h3 className={cls.message__body__details__header__title}>{title}</h3>
                            <span className={cls.message__body__details__header__date}>{time && `${formatMessageDate(time)}, ${dayjs(time).format('HH:mm')} gacha`}</span>
                            {file && (
                                <a
                                    href={file}
                                    download
                                    target='_blank'
                                    className={cls.message__body__details__header__file}
                                >
                                    <DownloadIcon />
                                </a>
                            )}
                        </div>
                        {description && <div className={cls.message__body__details__description}>{description}</div>}
                    </div>
                </div>
                <div className={cls.message__actions}>
                    {(status === HomeLessonTaskStatus.SEND || status === HomeLessonTaskStatus.DONE) && <Button rounded className={cls.message__actions__sended}>Yetkazildi</Button>}
                    {status === HomeLessonTaskStatus.CHECKED && <Button rounded className={cls.message__actions__done}>Bajarildi</Button>}
                    {status === HomeLessonTaskStatus.SEND && <Button rounded className={cls.message__actions__edit} onClick={onEdit}>Tahrirlash</Button>}
                </div>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatLessonTaskMessage;