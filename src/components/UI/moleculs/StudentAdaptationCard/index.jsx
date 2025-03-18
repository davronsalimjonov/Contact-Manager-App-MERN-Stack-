import { useEffect, useState } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { cn } from '@/utils/lib';
import { useStopwatch } from '@/hooks/useTimer';
import { getDateDifference } from '@/utils/time';
import { BellIcon, ReAssignAdaptationMentor } from '../../atoms/icons';
import cls from './StudentAdaptationCard.module.scss';

const StudentAdaptationCard = ({
    adaptationId="",
    fullName = '',
    phone = '',
    commingDate = '',
    showStatus = false,
    showTimer = false,
    firstContactDate = '',
    withChatBtn = true,
    setAdaptationId,
    onClick,
    onClickChat,
    onClickTask,
    onClickChange
}) => {
    const [status, setStatus] = useState('low')
    const { days, hours, minutes} = firstContactDate ? getDateDifference(new Date(commingDate), new Date(firstContactDate)) : useStopwatch({ autoStart: showStatus, offsetTimestamp: new Date(commingDate) });

    useEffect(() => {
        if(hours == 1 && days == 0) setStatus('medium')
        if(hours >= 2 || days > 0) setStatus('high')
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
                <span>{days > 0 && `${days} kun `}{hours > 0 && `${hours} soat `}{minutes} minut</span>
            </div>}
            <div className={cls.card__btns} onClick={e => e.stopPropagation()}>
                <button onClick={onClickTask}>Task Biriktirish</button>
                {withChatBtn ? <button onClick={onClickChat}>Chat</button> : <button onClick={() => {
                    onClickChange()
                    setAdaptationId(adaptationId)
                }}><ReAssignAdaptationMentor /></button>}
            </div>
        </div>
    );
}

export default StudentAdaptationCard;