import { useState } from "react"
import { ArrowFullIcon, CloseIcon, PlusIcon, ScheduleHeaderIcon } from "../../atoms/icons"
import cls from "./ScheduleHeader.module.scss"
import ScheduleLessonDialog from "../../moleculs/ScheduleLessonDialog"
import Button from "../../atoms/Buttons/Button"
import { useNavigate } from "react-router-dom"

const ScheduleHeader = ({
    lessonName = "Present Simple",
    isEmpty=true
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={cls.ScheduleHeader}>
            <div className={cls.ScheduleHeader__lesson}>
                <ScheduleHeaderIcon height="36" width="36" />
                <p>{lessonName}</p>
            </div>
            <div className={cls.ScheduleHeader__details}>
                <div className={cls.ScheduleHeader__details__video} onClick={() => setIsOpen(true)}>
                    <span>Videoni Ko'rish <ArrowFullIcon /></span>
                </div>
                <div className={cls.ScheduleHeader__details__homework}>
                    {isEmpty ? 
                        <Button onClick={() => navigate('create')}>Vazifa Yaratish <PlusIcon height={18} width={18} /></Button>
                        :
                        <span>Vazifa <ArrowFullIcon /></span>
                    }
                </div>
            </div>
            <ScheduleLessonDialog 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    )
}

export default ScheduleHeader