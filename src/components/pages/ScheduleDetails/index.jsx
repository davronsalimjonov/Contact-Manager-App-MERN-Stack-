import Button from '@/components/UI/atoms/Buttons/Button'
import { PeopleGroupIcon, PlusIcon } from '@/components/UI/atoms/icons'
import cls from "./SchduleDetails.module.scss"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'
import Pagination from '@/components/UI/moleculs/Pagination'
import { useNavigate } from 'react-router-dom'
import WhiteButton from '@/components/UI/atoms/Buttons/WhiteButton'
import ScheduleLessonsBtns from '@/components/UI/moleculs/ScheduleLessonsBtns'

const ScheduleLessons = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.ScheduleLessons}>
            <div className={cls.ScheduleLessons__btns}>
                <ScheduleLessonsBtns />
            </div>
            <div className={cls.ScheduleLessons__cards} >
                <ScheduleCards
                    onClick={() => navigate('/schedule/table')}
                />
            </div>
        </div>
    )
}

export default ScheduleLessons