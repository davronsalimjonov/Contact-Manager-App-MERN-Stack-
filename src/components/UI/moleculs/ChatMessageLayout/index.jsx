import dayjs from 'dayjs';
import { memo } from 'react';
import Avatar from 'react-avatar';
import cls from './ChatMessageLayout.module.scss';
import { CheckSmallIcon, DoubleCheckSmallIcon } from '../../atoms/icons';

const ChatMessageLayout = memo(({
    children,
    fullName = '',
    avatar = '',
    time = '',
    date = '',
    isSender = true,
    isViewed = false,
    showViewedStatus = false,
    timeStyle = {},
    fullNamePreffix
}) => {
    return (
        <div className={cls.message}>
            <Avatar
                round
                size={48}
                src={avatar}
                key={fullName}
                name={fullName}
            />
            <div className={cls.message__body}>
                <div className={cls.message__header}>
                    <span className={cls.message__header__name} style={!isSender ? { color: 'var(--blue-color)' } : {}}>{fullName}{fullNamePreffix ? <> {fullNamePreffix}</> : ''}</span>
                    <span className={cls.message__header__time} style={timeStyle} title={dayjs(date).format('DD MMMM YYYY HH:mm:ss')}>
                        {time}
                        {(showViewedStatus && isSender) && (isViewed ? <DoubleCheckSmallIcon /> : <CheckSmallIcon />)}
                    </span>
                </div>
                {children}
            </div>
        </div>
    );
})

export default ChatMessageLayout;