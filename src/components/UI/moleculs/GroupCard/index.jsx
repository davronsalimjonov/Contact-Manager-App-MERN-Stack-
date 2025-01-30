import Avatar from 'react-avatar';
import { cn } from '@/utils/lib';
import { getTimeFromMinutes, getWeekDay } from '@/utils/time';
import { PersonsIcon } from '../../atoms/icons';
import cls from './GroupCard.module.scss';

const GroupCard = ({
    name = '',
    studentsCount = 0,
    schedules = [],
    mainMentorFullName = '',
    mainMentorAvatar = '',
    callMentorFullName = '',
    callMentorAvatar = '',
    isCollecting = false,
    isClosed = false
}) => {
    return (
        <div className={cn(cls.card, isCollecting && cls.active, isClosed && cls.closed)}>
            <div className={cls.card__header}>
                <span className={cls.card__header__group}>{name} guruh</span>
                <span className={cls.card__header__students}><PersonsIcon />{studentsCount || 0} nafar</span>
            </div>
            <div className={cls.card__times}>
                {schedules?.map((schedule) => (
                    <div className={cls.card__times__item} key={schedule?.id}>
                        <span className={cls.card__times__item__day}>{getWeekDay(schedule?.weekday)}</span>
                        <span className={cls.card__times__item__line}></span>
                        <span className={cls.card__times__item__time}>{getTimeFromMinutes(schedule?.startTime)} - {getTimeFromMinutes(schedule?.endTime)}</span>
                    </div>
                ))}
            </div>
            <div className={cls.card__mentors}>
                <div className={cls.card__mentors__card}>
                    <span className={cls.card__mentors__card__role}>Asosiy mentor</span>
                    <span className={cls.card__mentors__card__name}>{mainMentorFullName}</span>
                    <Avatar className={cls.card__mentors__card__avatar} src={mainMentorAvatar} name={mainMentorFullName} round size={28} />
                </div>
                <div className={cls.card__mentors__card}>
                    <span className={cls.card__mentors__card__role}>Nazoratchi mentor</span>
                    <span className={cls.card__mentors__card__name}>{callMentorFullName}</span>
                    <Avatar className={cls.card__mentors__card__avatar} name={callMentorFullName} src={callMentorAvatar} round size={28} />
                </div>
            </div>
        </div>
    );
}

export default GroupCard;