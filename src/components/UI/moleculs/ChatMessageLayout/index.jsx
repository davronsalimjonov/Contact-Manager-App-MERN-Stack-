import Avatar from 'react-avatar';
import cls from './ChatMessageLayout.module.scss';
import { memo } from 'react';

const ChatMessageLayout = memo(({ 
    children,
    fullName = '',
    avatar = '',
    time = ''
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
                    <span className={cls.message__header__name}>{fullName}</span>
                    <span className={cls.message__header__time}>{time}</span>
                </div>
                {children}
            </div>
        </div>
    );
})

export default ChatMessageLayout;