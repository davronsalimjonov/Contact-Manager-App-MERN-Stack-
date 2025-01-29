import Button from '@/components/UI/atoms/Buttons/Button'
import { PlusIcon } from '@/components/UI/atoms/icons'
import cls from "./SchduleDetails.module.scss"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'
import Pagination from '@/components/UI/moleculs/Pagination'
import { useNavigate } from 'react-router-dom'

const SchduleDetails = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.SchduleDetails}>
            <div className={cls.SchduleDetails__btn}>
                <div>
                    <Button><PlusIcon height={20} />Qo'shish</Button>
                </div>
            </div>
            <div className={cls.SchduleDetails__cards} >
                <ScheduleCards
                    onClick={() => navigate('/schedule/table')}
                />
            </div>
            <div>
                <Pagination />
            </div>
        </div>
    )
}

export default SchduleDetails