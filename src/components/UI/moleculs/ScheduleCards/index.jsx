import { CalendarIcon, ClockIcon } from '../../atoms/icons'
import cls from "./ScheduleCards.module.scss"

const ScheduleCards = ({
    level = "A2",
    lesson = "Present Simple",
    date = "26.01.2025"
}) => {
    return (
        <div className={cls.ScheduleCards}>
            <div className={cls.ScheduleCards__lvl}>
                <p>{level} Level</p>
            </div>
            <div className={cls.ScheduleCards__details}>
                <div className={cls.ScheduleCards__details__lesson}>
                    <h1>{lesson}</h1>
                </div>
                <div>
                    <span><CalendarIcon fill='#5F6C86' /><p>{date}</p></span>
                </div>
                <div>
                    <span><ClockIcon /><p>{date}</p></span>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCards