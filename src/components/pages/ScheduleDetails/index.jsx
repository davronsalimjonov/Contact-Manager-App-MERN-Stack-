import Button from '@/components/UI/atoms/Buttons/Button'
import { PlusIcon } from '@/components/UI/atoms/icons'
import cls from "./SchduleDetails.module.scss"
import ScheduleCards from '@/components/UI/moleculs/ScheduleCards'

const SchduleDetails = () => {
  return (
    <div className={cls.SchduleDetails}>
        <div className={cls.SchduleDetails__btn}>
            <Button><PlusIcon height={20} /> Qo'shish</Button>
        </div>
        <div>
            <ScheduleCards />
        </div>
    </div>
  )
}

export default SchduleDetails