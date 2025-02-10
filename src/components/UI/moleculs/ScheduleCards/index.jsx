import { ArrowFullIcon, CalendarIcon, ClockIcon } from '../../atoms/icons'
import cls from "./ScheduleCards.module.scss"

const ScheduleCards = ({
    title = "",
    description = "",
    date = "",
    duration = "",
    video = "",
    onClick
}) => {
    return (
        <div className={cls.ScheduleCards} onClick={onClick}>
            <div className={cls.ScheduleCards__lesson}>
                <p>{`${title}. ${description}`}</p>
            </div>
            <div className={cls.ScheduleCards__details}>
                <div>
                    <div className={cls.ScheduleCards__details__date}>
                        <span><CalendarIcon fill='#5F6C86' /><p>{date}</p></span>
                    </div>
                    <div className={cls.ScheduleCards__details__time}>
                        <span><ClockIcon /><p>{duration}</p></span>
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