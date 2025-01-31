import { ArrowFullIcon, CalendarIcon, ClockIcon } from '../../atoms/icons'
import cls from "./ScheduleCards.module.scss"

const ScheduleCards = ({
    lesson = "1-dars. Present Simple",
    date = "26.01.2025",
    time = "1 soat 36 min",
    onClick
}) => {
    return (
        <div className={cls.ScheduleCards} onClick={onClick}>
            <div className={cls.ScheduleCards__lesson}>
                <p>{lesson}</p>
            </div>
            <div className={cls.ScheduleCards__details}>
                <div>
                    <div className={cls.ScheduleCards__details__date}>
                        <span><CalendarIcon fill='#5F6C86' /><p>{date}</p></span>
                    </div>
                    <div className={cls.ScheduleCards__details__time}>
                        <span><ClockIcon /><p>{time}</p></span>
                    </div>
                </div>
                <div className={cls.ScheduleCards__details__video}>
                    <span>Dars videosini ko'rish <ArrowFullIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCards