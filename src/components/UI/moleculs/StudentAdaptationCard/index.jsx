import { useEffect, useState } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { cn } from '@/utils/lib';
import { useStopwatch } from '@/hooks/useTimer';
import Avatar from '../../atoms/Avatar';
import { BellIcon, ReplaceIcon, SalesmanIcon } from '../../atoms/icons';
import cls from './StudentAdaptationCard.module.scss';

const StudentAdaptationCard = ({
    fullName = '',
    phone = '',
    operator = '',
    callMentorFullName = '',
    callMentorAvatar = '',
    commingDate = '',
    showStatus = false,
    showTimer = false,
    withReminder = true,
    allowReplaceMentor = false,
    onClick,
    onClickChat,
    onClickTask,
    onClickChange
}) => {
    const [status, setStatus] = useState('low')
    const { days, hours, minutes } = useStopwatch({ autoStart: showStatus, offsetTimestamp: new Date(commingDate) });

    useEffect(() => {
        if (hours == 1 && days == 0) setStatus('medium')
        if (hours >= 2 || days > 0) setStatus('high')
    }, [hours])

    return (
        <div
            onClick={onClick}
            className={cn(cls.card, {
                [cls.medium]: showStatus && (status === 'medium'),
                [cls.high]: showStatus && (status === 'high')
            })}
        >
            <h3 className={cls.card__name}>{fullName}</h3>
            <span className={cls.card__phone}>{formatPhoneNumberIntl(phone)}</span>
            {showTimer && <div className={cls.card__duration}>
                <BellIcon />
                <span>{days > 0 ? `${days} kun ${hours} soat` : `${hours > 0 ? `${hours} soat ` : ''} ${minutes} minut`}</span>
            </div>}
            {callMentorFullName && (
                <div className={cls.card__mentor}>
                    <Avatar size={22} src={callMentorAvatar} name={callMentorFullName} /> <span>{callMentorFullName}</span>
                </div>
            )}
            {operator && (
                <div className={cls.card__operator}>
                    <SalesmanIcon /> <span>{operator}</span>
                </div>
            )}
            <div className={cls.card__btns} onClick={e => e.stopPropagation()}>
                {withReminder && <button onClick={onClickTask}>Task Biriktirish</button>}
                <button onClick={onClickChat}>Chat</button>
                {allowReplaceMentor && <button onClick={onClickChange}><ReplaceIcon /></button>}
            </div>
        </div>
    );
}

export default StudentAdaptationCard;