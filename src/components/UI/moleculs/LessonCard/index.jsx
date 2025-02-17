import format from 'date-fns/format'
import { ArrowFullIcon, CalendarIcon, ClockIcon } from '../../atoms/icons'
import cls from "./LessonCard.module.scss"

const ScheduleCards = ({
    lessonNumber = 0,
    title = "",
    date = 0,
    duration = 0,
    video = "",
    onClick
}) => {
    return (
        <div className={cls.card} onClick={onClick}>
            <p className={cls.card__title}>{lessonNumber}-dars. {title}</p>
            <div className={cls.card__details}>
                <div className={cls.card__details__item}>
                    <CalendarIcon fill='#5F6C86' />
                    <span>{format(date, 'dd.MM.yyyy')}</span>
                </div>
                <div className={cls.card__details__item}>
                    <ClockIcon />
                    <span>{duration}</span>
                </div>
                <div className={cls.card__details__video}>
                    <span>Dars videosini ko'rish</span>
                    <ArrowFullIcon />
                </div>
            </div>
        </div>
    )
}

export default ScheduleCards