import Avatar from 'react-avatar';
import cls from './ChatMessageLayout.module.scss';
import { memo } from 'react';
import dayjs from 'dayjs';


const ChatMessageLayout = memo(({
    children,
    fullName = '',
    avatar = '',
    time = '',
    date = '',
    isSender = true
}) => {
    return (
        <div className={cls.message}>
            <Avatar
                key={fullName}
                round
                src={avatar}
                name={fullName}
                size={48}
            />
            <div className={cls.message__body}>
                <div className={cls.message__header}>
                    <span className={cls.message__header__name} style={!isSender ? { color: 'var(--blue-color)' } : {}}>{fullName}</span>
                    <span className={cls.message__header__time} title={dayjs(date).format('DD MMMM YYYY HH:mm:ss')}>{time}</span>
                </div>
                {children}
            </div>
        </div>
    );
})

export default ChatMessageLayout;