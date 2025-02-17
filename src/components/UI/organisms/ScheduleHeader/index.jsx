import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLessonInfo, } from "@/hooks/useLessonsSchedule"
import Button from "../../atoms/Buttons/Button"
import ScheduleLessonDialog from "../../moleculs/ScheduleLessonDialog"
import { ArrowRightIcon, BookPlayIcon, PlusIcon } from "../../atoms/icons"
import cls from "./ScheduleHeader.module.scss"

const ScheduleHeader = () => {
    const navigate = useNavigate()
    const { lessonId } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const { data: singleLesson } = useGetLessonInfo(lessonId)
    
    return (
        <div className={cls.ScheduleHeader}>
            <div className={cls.ScheduleHeader__lesson}>
                <BookPlayIcon height="36" width="36" />
                <p>{singleLesson?.title}. {singleLesson?.description}</p>
            </div>
            <div className={cls.ScheduleHeader__details}>
                <div className={cls.ScheduleHeader__details__video} onClick={() => setIsOpen(true)}>
                    <span>Videoni Ko'rish <ArrowRightIcon /></span>
                </div>
                <div className={cls.ScheduleHeader__details__homework}>
                    {singleLesson?.lessonHomeTask === null || singleLesson?.lessonHomeTask === undefined ?
                        <Button onClick={() => navigate(`/schedule/homework/create/${homeWorkId}`)}>Vazifa Yaratish <PlusIcon height={18} width={18} /></Button>
                        :
                        <span>Vazifa <ArrowRightIcon /></span>
                    } 
                    <Button onClick={() => navigate(`create-homework`)}>Vazifa Yaratish <PlusIcon height={18} width={18} /></Button>
                        <span onClick={() => navigate(`/schedule/homework/view/${singleLesson?.lessonHomeTask?.id}`)}>Vazifa <ArrowRightIcon /></span>
                    
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