import format from 'date-fns/format'
import { cn } from '@/utils/lib'
import { getTimeFromMinutes } from '@/utils/time'
import { ArrowRightIcon, CalendarIcon, ClockIcon, LiveIcon } from '../../atoms/icons'
import cls from "./LessonCard.module.scss"

const LessonCard = ({
    lessonNumber = 0,
    title = "",
    date = 0,
    duration = 0,
    onClickVideo,
    isLive = false,
    onClick
}) => {

    return (
        <div className={cn(cls.card, isLive && cls.live)} onClick={onClick}>
            {isLive && <div className={cls.live__icon}><LiveIcon /></div>}
            <p className={cls.card__title}>{lessonNumber}-dars. {title}</p>
            {!isLive && (
                <div className={cls.card__details}>
                    <div className={cls.card__details__item}>
                        <CalendarIcon fill='#5F6C86' />
                        <span>{format(date, 'dd.MM.yyyy')}</span>
                    </div>
                    {duration ? (
                        <div className={cls.card__details__item}>
                            <ClockIcon />
                            <span>{getTimeFromMinutes(duration)} soat</span>
                        </div>
                    ) : <div></div>}
                    <button className={cls.card__details__btn} onClick={e => (e.stopPropagation(), onClickVideo?.())}>
                        Dars videosini ko'rish
                        <ArrowRightIcon />
                    </button>
                </div>
            )}
            {isLive && <button className={cls.card__details__btn}>Darsga o’tish <ArrowRightIcon /></button>}
        </div>
    )
}

export default LessonCard;