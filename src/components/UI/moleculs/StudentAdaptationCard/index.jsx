import { useEffect, useState } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { cn } from '@/utils/lib';
import { BellIcon } from '../../atoms/icons';
import cls from './StudentAdaptationCard.module.scss';
import { useStopwatch } from '@/hooks/useTimer';

const StudentAdaptationCard = ({
    fullName = '',
    phone = '',
    commingDate = '',
    showStatus = false,
    onClick,
}) => {
    const [status, setStatus] = useState('low')
    const { hours, minutes, seconds} = useStopwatch({ autoStart: showStatus, offsetTimestamp: new Date(commingDate) });

    useEffect(() => {
        if(hours == 1) setStatus('medium')
        if(hours >= 2) setStatus('high')
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
            <div className={cls.card__duration}>
                <BellIcon />
                <span>{hours} soat {minutes} minut</span>
            </div>
        </div>
    );
}

export default StudentAdaptationCard;