import { useRef } from 'react';
import Avatar from 'react-avatar';
import { cn } from '@/utils/lib';
import { convertMinutesFromUTC0, getDayName, getTimeFromMinutes } from '@/utils/time';
import { CheckIcon, PersonsIcon, PlayArrowIcon } from '../../atoms/icons';
import cls from './GroupCard.module.scss';

const colors = ['rgba(30, 181, 58, 1)', 'rgba(255, 52, 219, 1)', 'rgba(236, 182, 4, 1)', 'rgba(0, 153, 181, 1)']

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

const GroupCard = ({
    name = '',
    studentsCount = 0,
    schedules = [],
    mainMentorFullName = '',
    mainMentorAvatar = '',
    isCollecting = false,
    isClosed = false,
    isSelected = false,
    showStartButton = false,
    onClickStart,
    onClick
}) => {
    const color = useRef(getRandomColor());
    return (
        <div onClick={onClick} className={cn(cls.card, isCollecting && cls.active, isClosed && cls.closed, isSelected && cls.selected__card)}>
            {isSelected && <div className={cls.selected}><CheckIcon width={41} height={29} fill='var(--blue-color)' /></div>}
            <div className={cls.card__header}>
                <span className={cls.card__header__group} style={{ backgroundColor: color.current }}>{name} guruh</span>
                <span className={cls.card__header__students}><PersonsIcon />{studentsCount || 0} nafar</span>
                {isCollecting && showStartButton && (
                    <button className={cls.card__header__play} onClick={e => (e.stopPropagation(), onClickStart?.())} type='button'>
                        <PlayArrowIcon />
                    </button>
                )}
            </div>
            <div className={cls.card__times}>
                {schedules?.length > 0 ? (
                    schedules?.map((schedule) => (
                        <div className={cls.card__times__item} key={schedule?.id}>
                            <span className={cls.card__times__item__day}>{getDayName(schedule?.weekday)}</span>
                            <span className={cls.card__times__item__line}></span>
                            <span className={cls.card__times__item__time}>{getTimeFromMinutes(convertMinutesFromUTC0(schedule?.startTime))} - {getTimeFromMinutes(convertMinutesFromUTC0(schedule?.endTime))}</span>
                        </div>
                    ))
                ) : (
                    <span className={cls.card__times__empty}>Dars jadval biriktirilmagan</span>
                )}
            </div>
            <div className={cls.card__mentors}>
                <div className={cls.card__mentors__card}>
                    <span className={cls.card__mentors__card__role}>Asosiy mentor</span>
                    <span className={cls.card__mentors__card__name}>{mainMentorFullName}</span>
                    <Avatar className={cls.card__mentors__card__avatar} src={mainMentorAvatar} name={mainMentorFullName} round size={28} />
                </div>
            </div>
        </div>
    );
}

export default GroupCard;