import { useEffect, useState } from "react"
import { ArrowFullIcon, CloseIcon, PlusIcon, ScheduleHeaderIcon } from "../../atoms/icons"
import cls from "./ScheduleHeader.module.scss"
import ScheduleLessonDialog from "../../moleculs/ScheduleLessonDialog"
import Button from "../../atoms/Buttons/Button"
import { useNavigate, useParams } from "react-router-dom"
import { useGetMentorLessonsSchedule } from "@/hooks/useLessonsSchedule"

const ScheduleHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const { mentorSingleLesson: { data: singleLesson } } = useGetMentorLessonsSchedule()
    const { homeWorkId } = useParams()
    
    return (
        <div className={cls.ScheduleHeader}>
            <div className={cls.ScheduleHeader__lesson}>
                <ScheduleHeaderIcon height="36" width="36" />
                <p>{singleLesson?.title}. {singleLesson?.description}</p>
            </div>
            <div className={cls.ScheduleHeader__details}>
                <div className={cls.ScheduleHeader__details__video} onClick={() => setIsOpen(true)}>
                    <span>Videoni Ko'rish <ArrowFullIcon /></span>
                </div>
                <div className={cls.ScheduleHeader__details__homework}>
                    {singleLesson?.lessonHomeTask === null || singleLesson?.lessonHomeTask === undefined ?
                        <Button onClick={() => navigate(`/schedule/homework/create/${homeWorkId}`)}>Vazifa Yaratish <PlusIcon height={18} width={18} /></Button>
                        :
                        <span onClick={() => navigate(`/schedule/homework/view/${singleLesson?.lessonHomeTask?.id}`)}>Vazifa <ArrowFullIcon /></span>
                    }
                </div>
            </div>
            <ScheduleLessonDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                video={singleLesson?.video}
            />
        </div>
    )
}

export default ScheduleHeader